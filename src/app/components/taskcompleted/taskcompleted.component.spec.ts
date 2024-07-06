import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TaskcompletedComponent } from './taskcompleted.component';
import { DbtaskService } from 'src/app/services/dbtask.service';
import { AnimationsService } from 'src/app/services/animations.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('TaskcompletedComponent', () => {
  let component: TaskcompletedComponent;
  let fixture: ComponentFixture<TaskcompletedComponent>;
  let dbtaskServiceMock: any;
  let animationsServiceMock: any;
  let routerMock: any;

  beforeEach(waitForAsync(() => {
    dbtaskServiceMock = jasmine.createSpyObj('DbtaskService', ['dbState', 'getData', 'deleteData', 'updateData']);
    animationsServiceMock = jasmine.createSpyObj('AnimationsService', ['removeElementFromList']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ TaskcompletedComponent ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: DbtaskService, useValue: dbtaskServiceMock },
        { provide: AnimationsService, useValue: animationsServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskcompletedComponent);
    component = fixture.componentInstance;

    // Mock responses
    dbtaskServiceMock.dbState.and.returnValue(of(true));
    dbtaskServiceMock.getData.and.returnValue(of([
      { id_user: 1, status: 2, title: 'Completed Task 1', description: 'Description 1' },
      { id_user: 1, status: 2, title: 'Completed Task 2', description: 'Description 2' }
    ]));

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
