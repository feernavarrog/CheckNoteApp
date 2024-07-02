import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TaskComponent } from './task.component';
import { DbtaskService } from '../../services/dbtask.service';
import { CameraService } from '../../services/camera.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let dbtaskServiceMock: any;
  let cameraServiceMock: any;
  let notificationServiceMock: any;
  let routerMock: any;

  beforeEach(waitForAsync(() => {
    dbtaskServiceMock = jasmine.createSpyObj('DbtaskService', ['getData', 'addData', 'updateData', 'deleteData']);
    cameraServiceMock = jasmine.createSpyObj('CameraService', ['takePicture', 'chooseFromGallery']);
    notificationServiceMock = jasmine.createSpyObj('NotificationService', ['presentAlert', 'presentToast']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ TaskComponent ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: DbtaskService, useValue: dbtaskServiceMock },
        { provide: CameraService, useValue: cameraServiceMock },
        { provide: NotificationService, useValue: notificationServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;

    // Mock responses
    dbtaskServiceMock.getData.and.returnValue(of([]));
    dbtaskServiceMock.addData.and.returnValue(of(true));
    dbtaskServiceMock.updateData.and.returnValue(of(true));
    dbtaskServiceMock.deleteData.and.returnValue(of(true));
    cameraServiceMock.takePicture.and.returnValue(Promise.resolve('base64image'));
    cameraServiceMock.chooseFromGallery.and.returnValue(Promise.resolve('base64image'));

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia crear una tarea', () => {
    component.title = 'Test Title';
    component.description = 'Test Description';
    component.status = 1;
    component.create();

    expect(dbtaskServiceMock.addData).toHaveBeenCalledWith('task', {
      id_user: component.id_user,
      title: 'Test Title',
      description: 'Test Description',
      image: '',
      status: 1
    });
    expect(notificationServiceMock.presentAlert).toHaveBeenCalledWith('Tarea creada', 'La tarea ha sido creada correctamente');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/tasklist/tasktodo']);
  });

  it('deberia editar una tarea', () => {
    component.id = 1;
    component.title = 'Updated Title';
    component.description = 'Updated Description';
    component.status = 1;

    component.edit();

    expect(dbtaskServiceMock.updateData).toHaveBeenCalledWith('task', 1, {
      title: 'Updated Title',
      description: 'Updated Description',
      status: 1
    });
    expect(notificationServiceMock.presentToast).toHaveBeenCalledWith('Tarea actualizada');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/tasklist/tasktodo']);
  });

  it('deberia eliminar una imagen', () => {
    const imageId = 1;

    component.removeImage(imageId);
    
    expect(dbtaskServiceMock.deleteData).toHaveBeenCalledWith('image', imageId);
    expect(dbtaskServiceMock.getData).toHaveBeenCalledWith('image');
  });

  it('deberia adjuntar una imagen', async () => {
    component.id = 1;
    component.id_user = 1;
    await component.attachPhotoFromCamera();

    expect(cameraServiceMock.takePicture).toHaveBeenCalled();
    expect(dbtaskServiceMock.addData).toHaveBeenCalledWith('image', {
      id_user: component.id_user,
      element: component.element,
      id_element: component.id,
      image: 'data:image/jpeg;base64,base64image'
    });
    expect(dbtaskServiceMock.getData).toHaveBeenCalledWith('image');
  });

  it('deberia adjuntar una imagen desde la galeria', async () => {
    component.id = 1;
    component.id_user = 1;
    await component.attachPhotoFromGallery();

    expect(cameraServiceMock.chooseFromGallery).toHaveBeenCalled();
    expect(dbtaskServiceMock.addData).toHaveBeenCalledWith('image', {
      id_user: component.id_user,
      element: component.element,
      id_element: component.id,
      image: 'data:image/jpeg;base64,base64image'
    });
    expect(dbtaskServiceMock.getData).toHaveBeenCalledWith('image');
  });
});
