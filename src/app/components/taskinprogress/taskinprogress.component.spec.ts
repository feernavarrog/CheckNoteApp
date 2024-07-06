import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TaskinprogressComponent } from './taskinprogress.component';
import { DbtaskService } from 'src/app/services/dbtask.service';
import { AnimationsService } from 'src/app/services/animations.service';
import { Router } from '@angular/router';
import { TasklistPage } from '../../pages/tasklist/tasklist.page';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('TaskinprogressComponent', () => {
  let component: TaskinprogressComponent;
  let fixture: ComponentFixture<TaskinprogressComponent>;
  let dbtaskServiceMock: any;
  let animationsServiceMock: any;
  let routerMock: any;
  let tasklistPageMock: any;

  beforeEach(waitForAsync(() => {
    dbtaskServiceMock = jasmine.createSpyObj('DbtaskService', ['dbState', 'getData', 'deleteData', 'updateData']);
    animationsServiceMock = jasmine.createSpyObj('AnimationsService', ['removeElementFromList', 'slideInBottom', 'slideOutBottom']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    tasklistPageMock = jasmine.createSpyObj('TasklistPage', ['']);

    TestBed.configureTestingModule({
      declarations: [ TaskinprogressComponent ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: DbtaskService, useValue: dbtaskServiceMock },
        { provide: AnimationsService, useValue: animationsServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: TasklistPage, useValue: tasklistPageMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskinprogressComponent);
    component = fixture.componentInstance;

    // Mock responses
    dbtaskServiceMock.dbState.and.returnValue(of(true));
    dbtaskServiceMock.getData.and.returnValue(of([
      { id_user: 1, status: 1, title: 'In Progress Task 1', description: 'Description 1' },
      { id_user: 1, status: 1, title: 'In Progress Task 2', description: 'Description 2' }
    ]));

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
