import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MynotesComponent } from './mynotes.component';
import { DbtaskService } from '../../services/dbtask.service';
import { ApiService } from '../../services/api.service';
import { AnimationsService } from '../../services/animations.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('MynotesComponent', () => {
  let component: MynotesComponent;
  let fixture: ComponentFixture<MynotesComponent>;
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
      declarations: [ MynotesComponent ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: DbtaskService, useValue: dbtaskServiceMock },
        { provide: ApiService, useValue: apiServiceMock },
        { provide: AnimationsService, useValue: animationsServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MynotesComponent);
    component = fixture.componentInstance;

    // Mock responses
    dbtaskServiceMock.dbState.and.returnValue(of(true));
    dbtaskServiceMock.getData.and.returnValue(of([
      { id_user: 1, status: 1, title: 'Note 1', description: 'Description 1' },
      { id_user: 1, status: 1, title: 'Note 2', description: 'Description 2' }
    ]));
    apiServiceMock.getApiCheckNoteBP.and.returnValue(of([
      { categoria: 2, titulo: 'Suggestion Note', descripcion: 'Description' }
    ]));

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Navega hacia viewNote con los datos correctos', () => {
    component.mynotes = [
      { title: 'Note 1', description: 'Description 1' },
      { title: 'Note 2', description: 'Description 2' }
    ];
    const navigationExtras = {
      state: {
        note: component.mynotes[1]
      }
    };

    component.viewNote(1);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/viewelement'], navigationExtras);
  });
});
