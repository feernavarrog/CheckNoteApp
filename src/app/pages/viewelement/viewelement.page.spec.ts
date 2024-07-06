import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ViewelementPage } from './viewelement.page';
import { TaskComponent } from '../../components/task/task.component';
import { NoteComponent } from '../../components/note/note.component';
import { DbtaskService } from 'src/app/services/dbtask.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; // Ajusta la importación según tu configuración

describe('ViewelementPage', () => {
  let component: ViewelementPage;
  let fixture: ComponentFixture<ViewelementPage>;
  let routerMock: any;
  let activatedRouteMock: any;
  let dbtaskServiceMock: any;

  beforeEach(waitForAsync(() => {
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
      getCurrentNavigation: () => ({
        extras: {
          state: {
            newTask: true,
            task: { id: 1, title: 'Test Task' },
            newNote: true,
            note: { id: 1, title: 'Test Note' }
          }
        }
      })
    };

    activatedRouteMock = {
      queryParams: of({})
    };

    dbtaskServiceMock = jasmine.createSpyObj('DbtaskService', ['dbState', 'getData', 'deleteData']);

    TestBed.configureTestingModule({
      declarations: [ViewelementPage, TaskComponent, NoteComponent],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: DbtaskService, useValue: dbtaskServiceMock },
        { provide: SQLite, useValue: {} }, // Proveer un mock vacío para SQLite
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewelementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
