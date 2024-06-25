import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  passwordInput!: string;
  emailInput!: string;
  activeInput: boolean = false;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
  }

  // Iniciar sesión en la aplicación
  login() {
    try {
      this.authService.validateUser(this.emailInput, this.passwordInput);
    } catch (error) {
      this.notificationService.presentToast('Usuario o contraseña incorrectos');
    }
  }
}