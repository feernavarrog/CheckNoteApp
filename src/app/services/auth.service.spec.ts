import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { DbtaskService } from '../services/dbtask.service';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let dbtaskServiceMock: any;
  let routerMock: any;
  let notificationServiceMock: any;

  beforeEach(() => {
    dbtaskServiceMock = jasmine.createSpyObj('DbtaskService', ['addData', 'getUserData', 'updateUserdata']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    notificationServiceMock = jasmine.createSpyObj('NotificationService', ['presentAlert', 'presentToast']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: DbtaskService, useValue: dbtaskServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: NotificationService, useValue: notificationServiceMock }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia registrar un usuario correctamente', () => {
    const user = {
      email: 'test@example.com',
      password: 'A1aaaaaa',
      passwordRepeat: 'A1aaaaaa',
      firstName: 'Un',
      lastName: 'Usuario',
      bornDate: '01/01/1990',
      address: '123 Main St'
    };

    service.register(user);

    expect(dbtaskServiceMock.addData).toHaveBeenCalledWith('user', {
      email: user.email,
      password: user.password,
      image: '',
      active: 0,
      name: user.firstName,
      lastname: user.lastName,
      nac: user.bornDate,
      dir: user.address
    });
    expect(notificationServiceMock.presentAlert).toHaveBeenCalledWith('Usuario registrado', 'Inicia sesión para continuar');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('deberia logear un usuario correctamente', async () => {
    const email = 'test@example.com';
    const password = 'A1aaaaaa';
    const userData = [
      { id: 1, email: email, password: password, name: 'John', active: 0 }
    ];

    dbtaskServiceMock.getUserData.and.returnValue(Promise.resolve(userData));
    dbtaskServiceMock.updateUserdata.and.returnValue(Promise.resolve());

    await service.validateUser(email, password);

    expect(dbtaskServiceMock.getUserData).toHaveBeenCalledWith('user');
    expect(dbtaskServiceMock.updateUserdata).toHaveBeenCalledWith('user', 1, { active: 1 });
    expect(sessionStorage.getItem('id')).toBe('1');
    expect(sessionStorage.getItem('firstname')).toBe('John');
    expect(sessionStorage.getItem('password')).toBe(password);
    expect(sessionStorage.getItem('active')).toBe('1');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });
});
