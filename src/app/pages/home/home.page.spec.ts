import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { RouterTestingModule } from '@angular/router/testing';
import { DbtaskService } from '../../services/dbtask.service';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

class MockDbtaskService {
  get data() {
    return [];
  }

  loadSuggerence() {
    return of({ suggestion: 'Test suggestion' });
  }
}

class MockApiService {
  getApiPostSuggerence() {
    return of({ suggestion: 'Test suggestion' });
  }

  leaveYourComment(comment: any) {
    return of({ success: true });
  }
}

class MockAuthService {
  logout() {}
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let dbtaskService: DbtaskService;
  let apiService: ApiService;
  let authService: AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: DbtaskService, useClass: MockDbtaskService },
        { provide: ApiService, useClass: MockApiService },
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    dbtaskService = TestBed.inject(DbtaskService);
    apiService = TestBed.inject(ApiService);
    authService = TestBed.inject(AuthService);

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia inicializar firstname en OnInit', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('John');
    component.ngOnInit();
    expect(component.firstName).toBe('John');
  });

  it('deberia cargar una sugerencia desde la API', () => {
    spyOn(apiService, 'getApiPostSuggerence').and.callThrough();
    component.loadSuggerence();
    expect(apiService.getApiPostSuggerence).toHaveBeenCalled();
    expect(component.currentSuggestion).toBe('Test suggestion');
  });

  it('deberia navegar a viewelement con una nueva tarea', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.createTask();
    expect(navigateSpy).toHaveBeenCalledWith(['/viewelement'], { state: { newTask: { title: '' } } });
  });

  it('deberia navegar a viewelement con una nueva nota', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.createNote();
    expect(navigateSpy).toHaveBeenCalledWith(['/viewelement'], { state: { newNote: { title: '' } } });
  });

  it('deberia navegar a notelist', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.goToNotes();
    expect(navigateSpy).toHaveBeenCalledWith(['/notelist']);
  });

  it('deberia navegar a lista de tareas', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.goToTasks();
    expect(navigateSpy).toHaveBeenCalledWith(['/tasklist']);
  });

  it('deberia navegar a userInfo', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.goToUserInfo();
    expect(navigateSpy).toHaveBeenCalledWith(['/userinfo']);
  });

  it('deberia cerrar la sesion del usuario', () => {
    spyOn(authService, 'logout');
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('deberia llamar a la api comentarios para postear un mensaje', () => {
    spyOn(apiService, 'leaveYourComment').and.returnValue(of({ success: true }));
    component.commentText = 'Test comment';
    component.submitComment();
    expect(apiService.leaveYourComment).toHaveBeenCalledWith({ mensaje: 'Test comment' });
    expect(component.showCommentBox).toBe(false);
    expect(component.commentText).toBe('');
  });
});
