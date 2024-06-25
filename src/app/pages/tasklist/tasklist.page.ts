import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.page.html',
  styleUrls: ['./tasklist.page.scss'],
})
export class TasklistPage implements OnInit {

  currentSuggestion: string = '';

  selectedSegment: string = 'tasktodo';

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.loadSuggerence();
  }

  // Cargar sugerencia aleatoria de la API de sugerencias
  loadSuggerence() {
    this.apiService.getApiPostSuggerence().subscribe(
      (data) => {
        this.currentSuggestion = data.suggestion;
      },
      (error) => {
        console.error('Error fetching API Post', error);
      }
    );
  }

  // Cambiar de segmento en la vista de tareas
  segmentChanged($event: CustomEvent) {
    let direction = $event.detail.value;
    this.router.navigate([`tasklist/${direction}`]);
  }

  // Cargar la vista de tareas al entrar en la página
  ionViewWillEnter() {
    this.router.navigate(['tasklist/tasktodo']);
  }
}
