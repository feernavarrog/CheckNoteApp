import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RegisterPage } from './register.page';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

class MockAuthService {
  register(user: any) {}
}

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let authService: AuthService;
  let datePipe: DatePipe;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [IonicModule.forRoot()],
      providers: [
        DatePipe,
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    datePipe = TestBed.inject(DatePipe);

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia llamar a authService.register en registrar', () => {
    spyOn(authService, 'register');
    
    component.email = 'test@example.com';
    component.firstName = 'un';
    component.lastName = 'usuario';
    component.password = 'test123';
    component.passwordRepeat = 'test123';
    component.register();
  
    expect(authService.register).toHaveBeenCalledWith({
      email: 'test@example.com',
      firstName: 'un',
      lastName: 'usuario',
      bornDate: '', 
      address: '',
      password: 'test123',
      passwordRepeat: 'test123'
    } as any);
  });

  it('deberia visibilizar datepicker', () => {
    component.showDatePicker = false;
    component.toggleDatePicker();
    expect(component.showDatePicker).toBe(true);
    component.toggleDatePicker();
    expect(component.showDatePicker).toBe(false);
  });
});
