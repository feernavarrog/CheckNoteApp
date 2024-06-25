import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewelementPageRoutingModule } from './viewelement-routing.module';

import { ViewelementPage } from './viewelement.page';

import { TaskComponent } from '../../components/task/task.component';
import { NoteComponent } from '../../components/note/note.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewelementPageRoutingModule
  ],
  declarations: [ViewelementPage, TaskComponent, NoteComponent]
})
export class ViewelementPageModule {}
