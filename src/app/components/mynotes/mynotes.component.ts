import { Component, OnInit } from '@angular/core';
import { DbtaskService } from '../../services/dbtask.service';
import { ApiService } from '../../services/api.service';
import { AnimationsService } from '../../services/animations.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-mynotes',
  templateUrl: './mynotes.component.html',
  styleUrls: ['./mynotes.component.scss'],
})
export class MynotesComponent  implements OnInit {

  idUser: number = 0;

  mynotes: any = [];
  suggerenceNote: any = [];
  image: any = [];
  showDetails: boolean = false;
  selectedTask: { title: string; description: string; image: string } | null = null; 

  constructor(
    private dbtaskService: DbtaskService,
    private apiService: ApiService,
    private animationsService: AnimationsService,
    private router: Router,
  ) {}

  ngOnInit() { 
    this.idUser = Number(sessionStorage.getItem('id'));
    this.dbtaskService.dbState().subscribe(isReady => {
      if (isReady) {
        this.subscribeToTableData('note');
      }
    });
    this.getSuggerenceNote();
  }

  // Obtener sugerencia de nota
  getSuggerenceNote() {
    this.apiService.getApiCheckNoteBP().subscribe(data => {

      const filteredData = data.filter((item: { categoria: number }) => Number(item.categoria) === 2);
      const randomIndex = Math.floor(Math.random() * filteredData.length);
      this.suggerenceNote = [filteredData[randomIndex]];

    });
  }

  // Suscribirse a los datos de la tabla
  private subscribeToTableData(tableName: string) {
    this.dbtaskService.getData(tableName).subscribe(data => {
      if (tableName === 'note') {
        this.mynotes = data.filter(item => item.id_user === this.idUser && item.status === 1);
      }
    });
  }

  // Crear nota en la base de datos
  deleteNote(index: number){
    const slidingItems = document.querySelectorAll('.sliding-note');
    const slidingItem = slidingItems[index];
    if (slidingItem) {
      this.animationsService.removeElementFromList(slidingItem);
      setTimeout(() => {this.dbtaskService.deleteData('note', this.mynotes[index].id);}, 500);
    }
  }

  // eliminar sugerencia de nota de la lista
  deleteSuggerenceNote(index: number){
    const slidingItems = document.querySelectorAll('ion-item-sliding');
    const slidingItem = slidingItems[index];
    if (slidingItem) {
      this.animationsService.removeElementFromList(slidingItem);
      setTimeout(() => { this.suggerenceNote.splice(index, 1); }, 500);
    }
  }

  // visualizar nota en la vista de detalle
  viewNote(index: number){
    const navigationExtras: NavigationExtras = {
      state: {
        note: this.mynotes[index]
      }
    };
    this.router.navigate(['/viewelement'], navigationExtras);
  }

  // archivar nota en la base de datos 
  archiveNote(index: any){
    const slidingItems = document.querySelectorAll('.sliding-note');
    const slidingItem = slidingItems[index];
    if (slidingItem) {
      this.animationsService.removeElementFromList(slidingItem);
      setTimeout(() => {this.dbtaskService.updateData('note', this.mynotes[index].id, { status: 2 });}, 500);
    }
  }

  showTaskDetails(task: any){

    this.selectedTask = task;
    this.showDetails = true;
    const taskDetails = document.querySelector('.task-details');
    if (taskDetails) {this.animationsService.slideInBottom(taskDetails);};

  }

  // ocultar vista de detalle
  hideTaskDetails(){

    const taskDetails = document.querySelector('.task-details');
    if (taskDetails) {this.animationsService.slideOutBottom(taskDetails);};
    setTimeout(() => {this.selectedTask = null; this.showDetails = false;}, 500);

  }
}
