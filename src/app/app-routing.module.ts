import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'game',
    loadChildren: () => import('./modules/game/game.module').then(m => m.GameModule)
  },
  {
    path: 'lead-board',
    loadChildren: () => import('./modules/lead-board/lead-board.module').then(m => m.LeadBoardModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
