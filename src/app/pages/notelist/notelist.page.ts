import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-notelist',
  templateUrl: './notelist.page.html',
  styleUrls: ['./notelist.page.scss'],
})
export class NotelistPage implements OnInit {

  currentSuggestion: string = '';

  selectedSegment: string = 'mynotes';

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
        console.error(error);
      }
    );
  }

  // Cambiar de segmento en la vista de notas  
  segmentChanged($event: CustomEvent) {
    let direction = $event.detail.value;
    this.router.navigate([`notelist/${direction}`]);
  }

  // Cargar la vista de notas al entrar en la página
  ionViewWillEnter() {
    this.router.navigate(['notelist/mynotes']);
  }
}
