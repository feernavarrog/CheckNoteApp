import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [DatePipe]
})
export class RegisterPage implements OnInit {

  isUserNameAvailable: boolean | undefined;
  showDatePicker  : boolean = false;
  selectedDate   : string = '';

  email: string = '';
  firstName: string = '';
  lastName: string = '';
  bornDate: string = '';
  address:  string = '';
  password: string = '';
  passwordRepeat: string = '';

  constructor(
    private datePipe: DatePipe,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  // Registrar usuario en la aplicación 
  register() {

    const user = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      bornDate: this.bornDate,
      address: this.address,
      password: this.password,
      passwordRepeat: this.passwordRepeat
    };

    this.authService.register(user);  
  }

  // setear fecha de nacimiento en el formato correcto 
  setBornDate(date : any){
    if (typeof date === 'string') {
      const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy') ?? '';
      this.bornDate = formattedDate;
    }
  }

  // Mostrar u ocultar el selector de fecha
  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
  }
}
