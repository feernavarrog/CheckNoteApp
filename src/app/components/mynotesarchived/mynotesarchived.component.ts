import { Component, OnInit } from '@angular/core';
import { DbtaskService } from 'src/app/services/dbtask.service';
import { AnimationsService } from 'src/app/services/animations.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-mynotesarchived',
  templateUrl: './mynotesarchived.component.html',
  styleUrls: ['./mynotesarchived.component.scss'],
})
export class MynotesarchivedComponent  implements OnInit {

  idUser: number = 0;
  myArchivedNotes: any = [];
  image: any = [];
  showDetails: boolean = false;
  selectedTask: { title: string; description: string; image: string } | null = null; 

  constructor(
    private dbtaskService: DbtaskService,
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
  }

  // Suscribirse a los datos de la tabla
  private subscribeToTableData(tableName: string) {
    this.dbtaskService.getData(tableName).subscribe(data => {
      if (tableName === 'note') {
        this.myArchivedNotes = data.filter(item => item.id_user === this.idUser && item.status === 2);
      }
    });
  }

  // eliminar nota en la base de datos
  deleteNote(index: number){
    const slidingItems = document.querySelectorAll('ion-item-sliding');
    const slidingItem = slidingItems[index];
    if (slidingItem) {
      this.animationsService.removeElementFromList(slidingItem);
      setTimeout(() => {this.dbtaskService.deleteData('note', this.myArchivedNotes[index].id);}, 500);
    }
  }

  // editar o visualizar nota en la base de datos
  viewNote(index: number){
    const navigationExtras: NavigationExtras = {
      state: {
        note: this.myArchivedNotes[index]
      }
    };
    this.router.navigate(['/viewelement'], navigationExtras);
  }

  // desarchivar nota en la base de datos
  desarchiveNote(index: any){
    const slidingItems = document.querySelectorAll('ion-item-sliding');
    const slidingItem = slidingItems[index];
    if (slidingItem) {
      this.animationsService.removeElementFromList(slidingItem);
      setTimeout(() => {this.dbtaskService.updateData('note', this.myArchivedNotes[index].id, { status: 1 });}, 500);
    }
  }

  // Mostrar detalles de la nota
  showTaskDetails(task: any){

    this.selectedTask = task;
    this.showDetails = true;
    const taskDetails = document.querySelector('.task-details');
    if (taskDetails) {this.animationsService.slideInBottom(taskDetails);};

  }

  // Ocultar detalles de la nota
  hideTaskDetails(){

    const taskDetails = document.querySelector('.task-details');
    if (taskDetails) {this.animationsService.slideOutBottom(taskDetails);};
    setTimeout(() => {this.selectedTask = null; this.showDetails = false;}, 500);

  }
}
