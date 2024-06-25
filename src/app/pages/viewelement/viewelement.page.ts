import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskComponent } from '../../components/task/task.component';
import { NoteComponent } from '../../components/note/note.component';

@Component({
  selector: 'app-viewelement',
  templateUrl: './viewelement.page.html',
  styleUrls: ['./viewelement.page.scss'],
})
export class ViewelementPage implements OnInit {

  taskElement: boolean = true;
  noteElement: boolean = true;

  @ViewChild(TaskComponent, { static: false }) taskComponent!: TaskComponent;
  @ViewChild(NoteComponent, { static: false }) noteComponent!: NoteComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.taskElement = true;
    this.noteElement = true;
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {

        // Recibir datos de la página anterior 
        const newTask = this.router.getCurrentNavigation()?.extras.state?.['newTask'];
        const task = this.router.getCurrentNavigation()?.extras.state?.['task'];
        const newNote = this.router.getCurrentNavigation()?.extras.state?.['newNote'];
        const note = this.router.getCurrentNavigation()?.extras.state?.['note'];

        // Mostrar componente de tarea o nota según los datos recibidos
        if (newTask) {
          this.noteElement = false;
          this.taskComponent.userIsEditing = false;
        }

        if (newNote) {
          this.taskElement = false;
          this.noteComponent.userIsEditing = false;
        }
        
        if (task) {
          this.taskComponent.userIsEditing = true;
          this.taskComponent.setData(task);
          this.noteElement = false;
        }

        if (note) {
          this.noteComponent.userIsEditing = true;
          this.noteComponent.setData(note);
          this.taskElement = false;
        }
      }

    });
  }
}
