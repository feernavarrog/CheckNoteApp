import { Component, OnInit } from '@angular/core';
import { DbtaskService } from 'src/app/services/dbtask.service';
import { AnimationsService } from 'src/app/services/animations.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-taskcompleted',
  templateUrl: './taskcompleted.component.html',
  styleUrls: ['./taskcompleted.component.scss'],
})
export class TaskcompletedComponent  implements OnInit {

  idUser: number = 0;
  taskCompleted: any = [];
  image: any = [];
  showDetails: boolean = false;
  selectedTask: { title: string; description: string; image: string } | null = null; 

  constructor(
    private dbtaskService: DbtaskService,
    private animationsService: AnimationsService,
    private router: Router  ) {}

  ngOnInit() { 
    this.idUser = Number(sessionStorage.getItem('id'));
    this.dbtaskService.dbState().subscribe(isReady => {
      if (isReady) {
        this.subscribeToTableData('task');
      }
    });
  }

  // Suscribirse a los datos de la tabla
  private subscribeToTableData(tableName: string) {
    this.dbtaskService.getData(tableName).subscribe(data => {
      if (tableName === 'task') {
        this.taskCompleted = data.filter(item => item.id_user === this.idUser && item.status === 2);
      }
    });
  }

  // eliminar tarea en la base de datos
  deleteTask(index: number){
    const slidingItems = document.querySelectorAll('ion-item-sliding');
    const slidingItem = slidingItems[index];
    if (slidingItem) {
      this.animationsService.removeElementFromList(slidingItem);
      setTimeout(() => {this.dbtaskService.deleteData('task', this.taskCompleted[index].id);}, 500);
    }
  }

  // editar tarea en la base de datos
  editTask(index: number){
    const navigationExtras: NavigationExtras = {
      state: {
        task: this.taskCompleted[index]
      }
    };
    this.router.navigate(['/viewelement'], navigationExtras);
  }
}
