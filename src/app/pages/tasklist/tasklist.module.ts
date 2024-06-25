import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasklistPageRoutingModule } from './tasklist-routing.module';

import { TasklistPage } from './tasklist.page';

import { TasktodoComponent } from '../../components/tasktodo/tasktodo.component';
import { TaskinprogressComponent } from '../../components/taskinprogress/taskinprogress.component';
import { TaskcompletedComponent } from '../../components/taskcompleted/taskcompleted.component';
import { SharedModule } from 'src/app/shared/shared.module';
//import { SuggestionComponent } from '../../components/suggestion/suggestion.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasklistPageRoutingModule,
    SharedModule
  ],
  declarations: [
    TasklistPage,
    TasktodoComponent,
    TaskinprogressComponent,
    TaskcompletedComponent
  ]
})
export class TasklistPageModule {}
