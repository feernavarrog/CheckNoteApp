import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TasktodoComponent } from './tasktodo.component';
import { DbtaskService } from '../../services/dbtask.service';
import { ApiService } from '../../services/api.service';
import { AnimationsService } from '../../services/animations.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('TasktodoComponent', () => {
  let component: TasktodoComponent;
  let fixture: ComponentFixture<TasktodoComponent>;
  let dbtaskServiceMock: any;
  let apiServiceMock: any;
  let animationsServiceMock: any;
  let routerMock: any;

  beforeEach(waitForAsync(() => {
    dbtaskServiceMock = jasmine.createSpyObj('DbtaskService', ['dbState', 'getData', 'deleteData', 'updateData']);
    apiServiceMock = jasmine.createSpyObj('ApiService', ['getApiCheckNoteBP']);
    animationsServiceMock = jasmine.createSpyObj('AnimationsService', ['removeElementFromList', 'slideInBottom', 'slideOutBottom']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ TasktodoComponent ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: DbtaskService, useValue: dbtaskServiceMock },
        { provide: ApiService, useValue: apiServiceMock },
        { provide: AnimationsService, useValue: animationsServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TasktodoComponent);
    component = fixture.componentInstance;

    // Mock responses
    dbtaskServiceMock.dbState.and.returnValue(of(true));
    dbtaskServiceMock.getData.and.returnValue(of([
      { id: 1, title: 'Task 1', description: 'Description 1', id_user: component.idUser, status: 0 },
      { id: 2, title: 'Task 2', description: 'Description 2', id_user: component.idUser, status: 0 }
    ]));

    apiServiceMock.getApiCheckNoteBP.and.returnValue(of([
      { categoria: 1, titulo: 'Suggestion Note', descripcion: 'Description' }
    ]));

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass the correct data when editing a task', () => {
    const mockTasks = [
      { id: 1, title: 'Task 1', description: 'Description 1', id_user: component.idUser, status: 0 },
      { id: 2, title: 'Task 2', description: 'Description 2', id_user: component.idUser, status: 0 }
    ];

    component.taskTodo = mockTasks;

    component.editTask(0);
    const navigationExtras = {
      state: {
        task: mockTasks[0]
      }
    };
    expect(routerMock.navigate).toHaveBeenCalledWith(['/viewelement'], navigationExtras);
  });
});
