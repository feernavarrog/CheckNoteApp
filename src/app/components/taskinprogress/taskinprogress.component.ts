import { Component, OnInit } from '@angular/core';
import { DbtaskService } from 'src/app/services/dbtask.service';
import { AnimationsService } from 'src/app/services/animations.service';
import { NavigationExtras, Router } from '@angular/router';
import { TasklistPage } from '../../pages/tasklist/tasklist.page';

@Component({
  selector: 'app-taskinprogress',
  templateUrl: './taskinprogress.component.html',
  styleUrls: ['./taskinprogress.component.scss'],
})
export class TaskinprogressComponent  implements OnInit {

  idUser: number = 0;
  taskInProgress: any = [];
  image: any = [];
  showDetails: boolean = false;
  selectedTask: { title: string; description: string; image: string } | null = null; 

  constructor(
    private dbtaskService: DbtaskService,
    private animationsService: AnimationsService,
    private router: Router,
    private tasklistPage: TasklistPage
  ) {}

  ngOnInit() { 
    this.idUser = Number(sessionStorage.getItem('id'));
    this.dbtaskService.dbState().subscribe(isReady => {
      if (isReady) {
        this.subscribeToTableData('task');
      }
    });
  }

  private subscribeToTableData(tableName: string) {
    this.dbtaskService.getData(tableName).subscribe(data => {
      if (tableName === 'task') {
        this.taskInProgress = data.filter(item => item.id_user === this.idUser && item.status === 1);
      }
    });
  }

  // eliminar tarea en la base de datos
  deleteTask(index: number){
    const slidingItems = document.querySelectorAll('ion-item-sliding');
    const slidingItem = slidingItems[index];
    if (slidingItem) {
      this.animationsService.removeElementFromList(slidingItem);
      setTimeout(() => {this.dbtaskService.deleteData('task', this.taskInProgress[index].id);}, 500);
    }
  }

  // editar tarea en la base de datos
  editTask(index: number){
    const navigationExtras: NavigationExtras = {
      state: {
        task: this.taskInProgress[index]
      }
    };
    this.router.navigate(['/viewelement'], navigationExtras);
  }

  // completar tarea en la base de datos
  completeTask(index: any){
    const slidingItems = document.querySelectorAll('ion-item-sliding');
    const slidingItem = slidingItems[index];
    if (slidingItem) {
      this.animationsService.removeElementFromList(slidingItem);
      setTimeout(() => {this.dbtaskService.updateData('task', this.taskInProgress[index].id, { status: 2 });}, 500);
    }
  }

  // mostrar detalles de la tarea
  showTaskDetails(task: any){

    this.selectedTask = task;
    this.showDetails = true;
    const taskDetails = document.querySelector('.task-details');
    if (taskDetails) {this.animationsService.slideInBottom(taskDetails);};

  }

  // ocultar detalles de la tarea
  hideTaskDetails(){

    const taskDetails = document.querySelector('.task-details');
    if (taskDetails) {this.animationsService.slideOutBottom(taskDetails);};
    setTimeout(() => {this.selectedTask = null; this.showDetails = false;}, 500);
  }
  
}
