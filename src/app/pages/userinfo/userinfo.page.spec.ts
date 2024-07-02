import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserinfoPage } from './userinfo.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { DbtaskService } from 'src/app/services/dbtask.service';
import { CameraService } from 'src/app/services/camera.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

// Paso 1: Crear un mock para SQLite
class SQLiteMock {
  public create() {
    return Promise.resolve({
      // Añade aquí los métodos específicos que necesitas simular
    });
  }
}

class MockDbtaskService {
  dbState() {
    return of(true);
  }

  async getUserData(tableName: string) {
    return [
      {
        id: 1,
        email: 'test@example.com',
        password: 'password123',
        image: 'profile.jpg',
        name: 'John',
        lastname: 'Doe',
        nac: '1990-01-01',
        dir: '123 Street'
      }
    ];
  }

  updateData(tableName: string, id: number, data: any) {}
}

describe('UserinfoPage', () => {
  let component: UserinfoPage;
  let fixture: ComponentFixture<UserinfoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserinfoPage],
      providers: [
        DatePipe,
        { provide: SQLite, useClass: SQLiteMock },
        { provide: DbtaskService, useClass: MockDbtaskService },
        NotificationService,
        AuthService,
        CameraService
      ],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UserinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data on loadUserData', async () => {
    await component.loadUserData();
    expect(component.email).toBe('test@example.com');
    expect(component.firstName).toBe('John');
    expect(component.lastName).toBe('Doe');
    expect(component.bornDate).toBe('1990-01-01');
    expect(component.address).toBe('123 Street');
  });
});

