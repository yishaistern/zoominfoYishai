import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { GameState } from '../../../../interfaces/model-interface';
import { cleerGame, userScore } from '../../../../store/actions';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit {
  didWin: boolean;
  constructor(
    public dialogRef: MatDialogRef<GameOverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GameState,
    private store: Store
    ) {

  }

  ngOnInit(): void {
    if (this.data.gameOver) {
      this.didWin = false;
    } else {
      this.didWin = true;
    }
  }

  close(): void {
    this.store.dispatch(userScore({score: this.data.counterCorectAnswers}));
    this.store.dispatch(cleerGame());
    this.dialogRef.close();
  }
}
