import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GameState } from '../../../../interfaces/model-interface';
import { selectGame } from '../../../../store/game-reducer';
import { GameService } from '../../../shared/services/game/game.service';
import { GameOverComponent } from '../game-over/game-over.component';
import { cleerGame, userScore } from '../../../../store/actions';
import { selectCurrentuser } from '../../../../store/main-reducer';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.scss']
})
export class MainGameComponent implements OnInit, OnDestroy {
  game: GameState;
  pickedAnswer: string;
  didPickWrite: boolean;
  dialogSub: Subscription;
  storeSub1: Subscription;
  storeSub2: Subscription;
  constructor(public dialog: MatDialog, private router: Router, private gameService: GameService, private store: Store) { }
  ngOnDestroy(): void {
    if (this.dialogSub && this.dialogSub.unsubscribe) {
      this.dialogSub.unsubscribe();
    }
    
    this.storeSub1.unsubscribe();
    this.storeSub2.unsubscribe();
  }
  ngOnInit(): void {
    this.gameService.startGame();
    this.storeSub1 = this.store.select(selectCurrentuser, state => state).subscribe((data) => {
      if (!data) {
        this.router.navigate(['/login']);
      }
    });
    this.storeSub2 = this.store.select(selectGame, state => state).subscribe((state: GameState) => {
      this.game = state;
      if (this.game.gameOver || this.game.gamewin) {
        this.openOverDialog();
      }
    });
  }

  openOverDialog(): void {
    const dialogRef = this.dialog.open(GameOverComponent, {
      data: this.game
    });

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/lead-board']);
    });
  }
  userPick(key): void {
    if (!this.game.didpick) {
      this.pickedAnswer = key;
    }
  }
  pickAnswer(key: string): void {
    if (!this.pickedAnswer || this.game.didpick || this.game.timeLeft === 0) {
      return;
    }
    this.didPickWrite = this.gameService.pickanswer(key, this.game.currentQuestion);
  }

  next(): void {
    this.pickedAnswer = '';
    this.gameService.nextQuestion();
  }
  skip(): void {
    this.gameService.nextQuestion(true);
  }

}
