import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewelementPage } from './viewelement.page';

const routes: Routes = [
  {
    path: '',
    component: ViewelementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewelementPageRoutingModule {}
