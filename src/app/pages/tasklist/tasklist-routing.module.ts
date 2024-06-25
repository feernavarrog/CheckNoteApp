import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasklistPage } from './tasklist.page';

import { TasktodoComponent } from '../../components/tasktodo/tasktodo.component';
import { TaskinprogressComponent } from '../../components/taskinprogress/taskinprogress.component';
import { TaskcompletedComponent } from '../../components/taskcompleted/taskcompleted.component';

const routes: Routes = [
  {
    path: '',
    component: TasklistPage,
    children: [
      { path: 'tasktodo', component: TasktodoComponent },
      { path: 'taskinprogress', component: TaskinprogressComponent },
      { path: 'taskcompleted', component: TaskcompletedComponent },
      { path: '', redirectTo: 'tasktodo', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasklistPageRoutingModule {}
