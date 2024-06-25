import { Component, OnInit } from '@angular/core';
import { DbtaskService } from '../../services/dbtask.service';
import { Router } from '@angular/router';
import { CameraService } from '../../services/camera.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent  implements OnInit {

  userIsEditing: boolean = false;

  id!: number;
  title: string = '';
  description: string = '';
  status!: number;
  image: string | null = null;
  images: any[] = [];
  id_user!: number;
  element: number = 2;

  constructor(
    private dbtaskService: DbtaskService,
    private router: Router,
    private cameraService: CameraService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.id_user = Number(sessionStorage.getItem('id'));
    this.loadImages();
  }

  // Obtener datos de la tarea
  setData(data: any){
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.image = data.image;
    this.status = data.status;
    this.loadImages();
  }

  // Cargar imagenes
  loadImages() {
    this.dbtaskService.getData('image').subscribe(data => {
      this.images = data.filter((img: any) => img.id_element === this.id && img.element === this.element && img.id_user === this.id_user);
    });
  }

  // Crear nota en la base de datos
  create(){
    const data = {
      id_user: this.id_user,
      title: this.title,
      description: this.description,
      image: '',
      status: 1
    };
    this.dbtaskService.addData('note', data);
    this.clearFields();
    this.notificationService.presentAlert('Tarea creada', 'La tarea ha sido creada correctamente');
    this.router.navigate(['/notelist/mynotes']);
  }

  // Actualizar nota en la base de datos
  edit(){
    const data = {
      title: this.title,
      description: this.description,
      status: this.status
    };
    this.dbtaskService.updateData('note', this.id, data);
    this.clearFields();
    this.notificationService.presentToast('Tarea actualizada');
    this.router.navigate(['/notelist/mynotes']);
  }

  // adjuntar foto desde la camara del dispositivo
  async attachPhotoFromCamera() {
    const photo = await this.cameraService.takePicture();
    if (photo) {
      const image = 'data:image/jpeg;base64,' + photo;

      const imageData = {
        id_user: this.id_user,
        element: this.element,
        id_element: this.id,
        image: image
      };

      this.dbtaskService.addData('image', imageData);
      this.loadImages();
    }
  }

  // adjuntar foto desde la galeria del dispositivo
  async attachPhotoFromGallery() {
    const photo = await this.cameraService.chooseFromGallery();
    if (photo) {
      const image = 'data:image/jpeg;base64,' + photo;

      const imageData = {
        id_user: this.id_user,
        element: this.element,
        id_element: this.id,
        image: image
      };

      this.dbtaskService.addData('image', imageData);
      this.loadImages();
    }
  }

  // eliminar imagen de la base de datos
  removeImage(imageId: number) {
    this.dbtaskService.deleteData('image', imageId);
    this.loadImages();
  }

  // Limpiar campos
  clearFields(){
    this.title = '';
    this.description = '';
    this.images = [];
  }
}
