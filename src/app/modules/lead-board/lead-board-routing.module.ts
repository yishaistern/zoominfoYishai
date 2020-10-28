import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoradComponent } from './components/borad/borad.component';
const routes: Routes = [
  {
    path: '',
    component: BoradComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadBoardRoutingModule { }
