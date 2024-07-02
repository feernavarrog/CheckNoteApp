import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { DbtaskService } from 'src/app/services/dbtask.service';
import { CameraService } from 'src/app/services/camera.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.page.html',
  styleUrls: ['./userinfo.page.scss'],
  providers: [DatePipe]
})
export class UserinfoPage implements OnInit {
  updateUser() {
    throw new Error('Method not implemented.');
  }

    emailAvailable: boolean | undefined;
    showDatePicker  : boolean = false;
    selectedDate   : string = '';
    saveButton     : boolean = false;

    image: string = '';

    id: number = 0;
    email: string = '';
    firstName: string = '';
    lastName: string = '';
    bornDate: string = '';
    address:  string = '';

    lastPasword: string = '';

    password: string = '';
    passwordRepeat: string = '';

    actualPassword: string = '';
    actualPasswordRepeat: string = '';
  user: any;
  
    constructor(
      private datePipe: DatePipe,
      private authService: AuthService,
      private dbtaskService: DbtaskService,
      private cameraService: CameraService,
      private notificationService: NotificationService,
      private router: Router
    ) { }
  
    ngOnInit() {
      this.id = Number(sessionStorage.getItem('id'));

      this.saveButton = false;
      this.dbtaskService.dbState().subscribe(isReady => {
        if (isReady) {
          this.loadUserData();
        }
      });
    }

    // Cargar datos de usuario desde la base de datos 
    async loadUserData() {
      const userData = (await this.dbtaskService.getUserData('user')).find((user: any) => user.id === this.id);
  
      if (!userData) {
        this.notificationService.presentToast('Usuario no encontrado');
        console.log('Usuario no encontrado');
      }

      this.email = userData.email;
      this.password = userData.password;
      this.passwordRepeat = userData.password;
      this.image = userData.image;
      this.firstName = userData.name;
      this.lastName = userData.lastname;
      this.bornDate = userData.nac;
      this.address = userData.dir;

      this.lastPasword = userData.password;

      console.log(userData.email, userData.password, userData.firstname);
    }
  
    // Actualizar datos de usuario en la base de datos 
    saveChanges() {

      if (this.lastPasword === this.actualPassword && this.actualPassword === this.actualPasswordRepeat) {

        const user = {
          id : this.id,
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          bornDate: this.bornDate,
          address: this.address,
          password: this.password,
          passwordRepeat: this.passwordRepeat
        };

        this.authService.updateUser(user);
        this.notificationService.presentAlert('Cambios guardados', 'Los cambios se han guardado correctamente');
        this.router.navigate(['/home']);

      } else {
        this.notificationService.presentToast('Contraseña actual es incorrecta');
        console.log('Contraseña actual es incorrecta');
      }
    }
  
    // setear fecha de nacimiento en el formato correcto  
    setBornDate(date : any){
      if (typeof date === 'string') {
        const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy') ?? '';
        this.bornDate = formattedDate;
      }
    }

    // Verificar disponibilidad de correo electrónico 
    checkEmailAvailability() {
      this.emailAvailable = this.email.length > 0;
    }

    // Habilitar botón de guardar cambios
    toggleSaveButton() {
      this.saveButton = true;
    }
  
    // Mostrar u ocultar el selector de fecha
    toggleDatePicker() {
      this.showDatePicker = !this.showDatePicker;
    }

    // Tomar foto desde la cámara 
    async attachPhotoFromCamera() {
      const photo = await this.cameraService.takePicture();
      if (photo) {
        const image = 'data:image/jpeg;base64,' + photo;
  
        const imageData = {
          image: image
        };
  
        this.dbtaskService.updateData('user', this.id, imageData);
        this.loadUserData();
      }
    }
  
    // Seleccionar foto desde la galería
    async attachPhotoFromGallery() {
      const photo = await this.cameraService.chooseFromGallery();
      if (photo) {
        const image = 'data:image/jpeg;base64,' + photo;
  
        const imageData = {
          image: image
        };

        this.dbtaskService.updateData('user', this.id, imageData);
        this.loadUserData();
      }
    }
  
    // Eliminar foto de perfil 
    removeImage() {

      const imageData = {
        image: ''
      };

      this.dbtaskService.updateData('user', this.id, imageData);
      this.loadUserData();
    }
}
