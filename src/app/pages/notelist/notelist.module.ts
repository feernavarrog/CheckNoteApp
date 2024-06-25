import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotelistPageRoutingModule } from './notelist-routing.module';

import { NotelistPage } from './notelist.page';

import { MynotesComponent } from '../../components/mynotes/mynotes.component';
import { MynotesarchivedComponent } from '../../components/mynotesarchived/mynotesarchived.component';
import { SharedModule } from '../../shared/shared.module';
//import { SuggestionComponent } from '../../components/suggestion/suggestion.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotelistPageRoutingModule,
    SharedModule
  ],
  declarations: [
    NotelistPage,
    MynotesComponent,
    MynotesarchivedComponent
  ]
})
export class NotelistPageModule {}
