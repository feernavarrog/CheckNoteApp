import { Injectable } from '@angular/core';
import { DbtaskService } from '../services/dbtask.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private dbtaskService: DbtaskService,
    private router: Router,
    private notificationService: NotificationService

  ) { }

  // Registro de usuario en la base de datos
  register(user: any) {

    if (this.validateData(user)) {

      user = {
        email: user.email,
        password: user.password,
        image: '',
        active: 0,
        name: user.firstName,
        lastname: user.lastName,
        nac: user.bornDate,
        dir: user.address
      };

      this.dbtaskService.addData('user', user);
      this.notificationService.presentAlert('Usuario registrado', 'Inicia sesión para continuar');
      console.log('Usuario registrado');
      this.router.navigate(['/login']);
    };
  }

  // Actualizar datos de usuario en la base de datos
  async updateUser(user: any) {

    const newUser = {
      email: user.email,
      password: user.password,
      name: user.firstName,
      lastname: user.lastName,
      nac: user.bornDate,
      dir: user.address
    };

    // Validar datos de usuario antes de actualizar
    if (this.validateData(user)) {
      await this.dbtaskService.updateUserdata('user', user.id, newUser).then(() => {

        sessionStorage.setItem('id', user.id.toString());
        sessionStorage.setItem('firstname', user.name);
        sessionStorage.setItem('password', user.password);
        
        // Notificar al usuario que los datos han sido actualizados
        this.notificationService.presentToast('Usuario actualizado');
        console.log('Usuario actualizado');
        });
    } else {
      console.log('Error al actualizar usuario');
    }
  }

  // Validar datos de usuario antes de registrar o actualizar en la base de datos
  validateData(user: any): boolean {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PasswordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,10}$/; // 8-10 caracteres, al menos una mayúscula y un número

    // Validar campos vacíos  
    if (user.email === '' || user.password === '' || user.passwordRepeat === '' || user.firstName === '') {
      this.notificationService.presentToast('Campos vacíos');
      console.log('Campos vacíos');
      return false;
    }

    // Validar formato de correo electrónico
    if (emailRegex.test(user.email) === false) {
      this.notificationService.presentToast('Correo inválido');
      console.log('Correo inválido');
      return false;
    }

    // Validar formato de contraseña
    if (PasswordRegex.test(user.password) === false) {
      this.notificationService.presentToast('Contraseña inválida');
      console.log('Contraseña inválida');
      return false;
    }

    // Validar que las contraseñas coincidan
    if (user.password !== user.passwordRepeat) {
      this.notificationService.presentToast('Las contraseñas no coinciden');
      console.log('Las contraseñas no coinciden');
      return false;
    }

    return true;
  }

  // Validar credenciales de usuario
  async validateUser(emailInput: string, passwordInput: string) {

    const userData = (await this.dbtaskService.getUserData('user')).find((user: any) => user.email === emailInput && user.password === passwordInput);

    if (!userData) {
      this.notificationService.presentToast('Usuario o contraseña incorrectos');
      throw new Error('Usuario o contraseña incorrectos');
    }

    console.log(userData.email, userData.password);

    // Actualizar estado de usuario a activo en la base de datos y almacenar en sesión
    await this.dbtaskService.updateUserdata('user', userData.id, { active: 1 }).then(() => {

    sessionStorage.setItem('id', userData.id.toString());
    sessionStorage.setItem('firstname', userData.name);
    sessionStorage.setItem('password', userData.password);
    sessionStorage.setItem('active', '1');
    
    this.router.navigate(['/home']);
    });
  }

  // Obtener datos de usuario de la base de datos por correo electrónico
  async getUser(emailInput: string): Promise<boolean> {

    const users = await this.dbtaskService.getUserData('user');
    const user = users.find((user: any) => user.email === emailInput);

    if (!user) {
      return false;
    } else {
      return true;
    }
  }

  // Verificar si el usuario está logueado y activo en la base de datos
  async isLoggedIn(): Promise<boolean> {

    const idStored = Number(sessionStorage.getItem('id'));

    const isTest = sessionStorage.getItem('test');

    if (isTest === 'true') {
      return true;
    }

    if (!idStored) {
      return false;
    }

    // buscar en la BD si el usuario está activo
    const user = await this.dbtaskService.getUserData('user');
    const userIsActive = user.find((user: any) => user.id === idStored);

    if (userIsActive && userIsActive.active === 1) {
      return true;
    } else { 
      return false; 
    } 
  }

  // Cerrar sesión de usuario y actualizar estado a inactivo en la base de datos
  logout() {

    const userId = Number(sessionStorage.getItem('id'));

    const data = {
      active: 0
    };

    // Actualizar estado de usuario a inactivo en la base de datos y cerrar sesión
    this.dbtaskService.updateData('user', userId, data)
    .then(() => {
      sessionStorage.clear();
      this.notificationService.presentAlert('Sesión cerrada', 'Hasta luego');
      this.router.navigate(['/login']);
    })
    .catch(error => {
      console.error('Error updating user status during logout', error);
    });
  }
}
