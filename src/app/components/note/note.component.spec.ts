import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { NoteComponent } from './note.component';
import { DbtaskService } from '../../services/dbtask.service';
import { CameraService } from '../../services/camera.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;
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
      declarations: [ NoteComponent ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: DbtaskService, useValue: dbtaskServiceMock },
        { provide: CameraService, useValue: cameraServiceMock },
        { provide: NotificationService, useValue: notificationServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;

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

  it('deberia crear una nota', () => {
    component.title = 'Test Title';
    component.description = 'Test Description';
    component.create();

    expect(dbtaskServiceMock.addData).toHaveBeenCalledWith('note', {
      id_user: component.id_user,
      title: 'Test Title',
      description: 'Test Description',
      image: '',
      status: 1
    });
    expect(notificationServiceMock.presentAlert).toHaveBeenCalledWith('Tarea creada', 'La tarea ha sido creada correctamente');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/notelist/mynotes']);
  });

  it('deberia editar una nota', () => {
    component.id = 1;
    component.title = 'Updated Title';
    component.description = 'Updated Description';
    component.status = 1;

    component.edit();

    expect(dbtaskServiceMock.updateData).toHaveBeenCalledWith('note', 1, {
      title: 'Updated Title',
      description: 'Updated Description',
      status: 1
    });
    expect(notificationServiceMock.presentToast).toHaveBeenCalledWith('Tarea actualizada');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/notelist/mynotes']);
  });
  

  it('deberia eliminar una imagen', () => {
    const imageId = 1;

    component.removeImage(imageId);
    
    expect(dbtaskServiceMock.deleteData).toHaveBeenCalledWith('image', imageId);
    expect(dbtaskServiceMock.getData).toHaveBeenCalledWith('image');
  });
});
