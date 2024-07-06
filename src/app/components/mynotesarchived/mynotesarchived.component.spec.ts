import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MynotesarchivedComponent } from './mynotesarchived.component';
import { DbtaskService } from 'src/app/services/dbtask.service';
import { AnimationsService } from 'src/app/services/animations.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('MynotesarchivedComponent', () => {
  let component: MynotesarchivedComponent;
  let fixture: ComponentFixture<MynotesarchivedComponent>;
  let dbtaskServiceMock: any;
  let animationsServiceMock: any;
  let routerMock: any;

  beforeEach(waitForAsync(() => {
    dbtaskServiceMock = jasmine.createSpyObj('DbtaskService', ['dbState', 'getData', 'deleteData', 'updateData']);
    animationsServiceMock = jasmine.createSpyObj('AnimationsService', ['removeElementFromList', 'slideInBottom', 'slideOutBottom']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ MynotesarchivedComponent ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: DbtaskService, useValue: dbtaskServiceMock },
        { provide: AnimationsService, useValue: animationsServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MynotesarchivedComponent);
    component = fixture.componentInstance;

    // Mock responses
    dbtaskServiceMock.dbState.and.returnValue(of(true));
    dbtaskServiceMock.getData.and.returnValue(of([
      { id_user: 1, status: 2, title: 'Archived Note 1', description: 'Description 1' },
      { id_user: 1, status: 2, title: 'Archived Note 2', description: 'Description 2' }
    ]));

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

