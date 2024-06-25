import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SuggestionComponent } from '../components/suggestion/suggestion.component';

@NgModule({
  declarations: [SuggestionComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [SuggestionComponent]
})
export class SharedModule {}