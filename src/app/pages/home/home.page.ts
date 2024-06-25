import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DbtaskService } from '../../services/dbtask.service';
import { ApiService } from '../../services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  currentSuggestion: string = '';
  showCommentBox: boolean = false;
  commentText: string = '';

  firstName: any = '';
  apiPosts: any[] = [];

  constructor(
    private dbtaskService: DbtaskService,
    private apiService: ApiService,
    private authService: AuthService, // borrar
    private router: Router
  ) {}

  ngOnInit() {

    this.firstName = sessionStorage.getItem('firstname') || '';
    this.loadSuggerence();
    
  }

  // Cargar sugerencia aleatoria de la API de sugerencias
  loadSuggerence() {
    this.apiService.getApiPostSuggerence().subscribe(
      (data) => {
        this.currentSuggestion = data.suggestion;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // crear tarea en la base de datos
  createTask() {
    const navigationExtras: NavigationExtras = {
      state: {
        newTask: { title: '' },
      }
    };
    this.router.navigate(['/viewelement'], navigationExtras);
  }

  // crear nota en la base de datos 
  createNote() {
    const navigationExtras: NavigationExtras = {
      state: {
        newNote: { title: '' },
      }
    };
    this.router.navigate(['/viewelement'], navigationExtras);
  }

  // Navegar a la lista de tareas 
  goToNotes() {
    this.router.navigate(['/notelist']);
  }

  // Navegar a la lista de tareas
  goToTasks() {
    this.router.navigate(['/tasklist']);
  }

  // Navegar a la pagina de usuario 
  goToUserInfo() {
    this.router.navigate(['/userinfo']);
  }

  // Salir de la aplicación 
  logout() {
    this.authService.logout();
  }

  // Enviar comentario a la API 
  submitComment() {
    if (this.commentText.trim()) {
      this.apiService.leaveYourComment({ mensaje: this.commentText.trim() }).subscribe(
        response => {
          console.log('Solicitud enviada con éxito', response);
          this.showCommentBox = false;
          this.commentText = '';
        },
        error => {
          console.error('Error enviando el comentario', error);
        }
      );
    }
  }
}
