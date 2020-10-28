import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { MainGameComponent } from './components/main-game/main-game.component';
import { StoreModule } from '@ngrx/store';
import * as gameReduce from '../../store/game-reducer';
import { GameOverComponent } from './components/game-over/game-over.component';
import { DemoMaterialModule } from '../../material.module';

@NgModule({
  declarations: [MainGameComponent, GameOverComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    DemoMaterialModule,
    StoreModule.forFeature('game', gameReduce.gameReducer)
  ],
  exports: [
    DemoMaterialModule
  ],
})
export class GameModule { }
