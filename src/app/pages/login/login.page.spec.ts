import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

class MockAuthService {
  validateUser(email: string, password: string) {}
}

class MockNotificationService {
  presentToast(message: string) {}
}

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authService: AuthService;
  let notificationService: NotificationService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: NotificationService, useClass: MockNotificationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    notificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call validateUser on login', () => {
    spyOn(authService, 'validateUser');
    component.emailInput = 'test@example.com';
    component.passwordInput = 'password';
    component.login();
    expect(authService.validateUser).toHaveBeenCalledWith('test@example.com', 'password');
  });

  it('should present toast on login error', () => {
    spyOn(authService, 'validateUser').and.throwError('Invalid credentials');
    spyOn(notificationService, 'presentToast');
    component.emailInput = 'test@example.com';
    component.passwordInput = 'password';
    component.login();
    expect(notificationService.presentToast).toHaveBeenCalledWith('Usuario o contraseña incorrectos');
  });
});
