import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotelistPage } from './notelist.page';
import { MynotesComponent } from 'src/app/components/mynotes/mynotes.component';
import { MynotesarchivedComponent } from 'src/app/components/mynotesarchived/mynotesarchived.component';

const routes: Routes = [
  {
    path: '',
    component: NotelistPage,
    children: [
      { path: 'mynotes', component: MynotesComponent },
      { path: 'mynotesarchived', component: MynotesarchivedComponent },
      { path: '', redirectTo: 'mynotes', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotelistPageRoutingModule {}
