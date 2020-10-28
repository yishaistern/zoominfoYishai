import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainGameComponent } from './components/main-game/main-game.component';
const routes: Routes = [
  {
    component: MainGameComponent,
    path: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
