import { Component, OnInit } from '@angular/core';
import { DbtaskService } from '../../services/dbtask.service';
import { ApiService } from '../../services/api.service';
import { AnimationsService } from '../../services/animations.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tasktodo',
  templateUrl: './tasktodo.component.html',
  styleUrls: ['./tasktodo.component.scss'],
})
export class TasktodoComponent  implements OnInit {

  idUser: number = 0;

  taskTodo: any = [];
  suggerenceTask: any = [];
  image: any = [];
  showDetails: boolean = false;
  selectedTask: { title: string; description: string; image: string } | null = null; 

  constructor(
    private dbtaskService: DbtaskService,
    private animationsService: AnimationsService,
    private router: Router,
    private apiService: ApiService    
  ) {}

  ngOnInit() { 
    this.idUser = Number(sessionStorage.getItem('id'));
    this.dbtaskService.dbState().subscribe(isReady => {
      if (isReady) {
        this.subscribeToTableData('task');
      }
    });
    this.getSuggerenceTask();
  }

  // Obtener sugerencia de tarea  
  getSuggerenceTask() {
    this.apiService.getApiCheckNoteBP().subscribe(data => {

      const filteredData = data.filter((item: { categoria: number }) => Number(item.categoria) === 1);
      const randomIndex = Math.floor(Math.random() * filteredData.length);
      this.suggerenceTask = [filteredData[randomIndex]];

    });
  }

  // Suscribirse a los datos de la tabla
  private subscribeToTableData(tableName: string) {
    this.dbtaskService.getData(tableName).subscribe(data => {
      if (tableName === 'task') {
        this.taskTodo = data.filter(item => item.id_user === this.idUser && item.status === 0);
      }
    });
  }

  // eliminar tarea en la base de datos
  deleteTask(index: number){
    const slidingItems = document.querySelectorAll('.sliding-task');
    const slidingItem = slidingItems[index];
    if (slidingItem) {
      this.animationsService.removeElementFromList(slidingItem);
      setTimeout(() => {this.dbtaskService.deleteData('task', this.taskTodo[index].id);}, 500);
    }
  }

  // eliminar sugerencia de tarea de la lista
  deleteSuggerenceTask(index: number){
    const slidingItems = document.querySelectorAll('ion-item-sliding');
    const slidingItem = slidingItems[index];
    if (slidingItem) {
      this.animationsService.removeElementFromList(slidingItem);
      setTimeout(() => { this.suggerenceTask.splice(index, 1); }, 500);
    }
  }

  // editar tarea
  editTask(index: number){
    const navigationExtras: NavigationExtras = {
      state: {
        task: this.taskTodo[index]
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
      setTimeout(() => {this.dbtaskService.updateData('task', this.taskTodo[index].id, { status: 2 });}, 500);
    }
  }

  // visualizar tarea en la vista de detalle
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
