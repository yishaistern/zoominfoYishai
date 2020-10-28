import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';
import { GameState, Question } from '../../../../interfaces/model-interface';
import { correctAnswer, resetGame, rongAnswer, setQuestion, setTimeLeft, winGame } from '../../../../store/actions';
import { selectGame, selectTime } from '../../../../store/game-reducer';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  inervalSub: Subscription;
  questions: Question[];
  game: GameState;
  constructor(private http: HttpClient, private store: Store, private route: Router) {
    this.startToListen();
  }

  startToListen(): void {
    this.store.select(selectGame, state => state).subscribe((state: GameState) => {
      this.game = state;
    });


  }

  interpulateData(data): any {
    if (data && data.response_code === 0) {
      const arr: Question[] = data.results;
      for (let i = 0; i < arr.length; i++) {
        const item: Question = arr[i];
        const randomIndex = Math.random();
        if (randomIndex < 0.25) {
          item.correctIndex = 0;
        } else if (randomIndex < 0.5){
          item.correctIndex = 1;
        } else if (randomIndex < 0.75){
          item.correctIndex = 2;
        } else {
          item.correctIndex = 3;
        }
        item.answers_array = JSON.parse(JSON.stringify(item.incorrect_answers));
        item.answers_array.splice(item.correctIndex, 0, item.correct_answer);
      }
      return arr;
    } else {
      this.route.navigate(['/login']);
    }
    return [];
  }
  getGameData(): Observable<any> {
    return this.http.get('./assets/api.json').pipe(
      map((data) => {
        return this.interpulateData(data);
      })
    );
  }
  startGame(): void{
    this.getGameData().subscribe(
      (data) => {
        this.questions = data;
        const gamePayload = {newQuestion: data[0], howMany: data.length};
        this.store.dispatch(resetGame(gamePayload));
        this.startInterval();
      },
      (err) => {
        this.route.navigate(['/login']);
      }
    );
  }
  delayNextQestion(): void {
    setTimeout(() => {
      this.nextQuestion();
    }, 700);
  }
  pickanswer(key: string, ques: Question): boolean {
    this.inervalSub.unsubscribe();
    let answer = false;
    if (key === ques.correct_answer) {
      this.store.dispatch(correctAnswer());
      answer = true;
    } else {
      this.store.dispatch(rongAnswer());
    }
    return answer;
  }
  nextQuestion(skip: boolean = false): void {
    if (this.game.gameOver) {
      return; // game ends
    }
    const index = this.game.currentIndex;
    if (index === (this.game.howMqntQuestions - 1)) {
      this.store.dispatch(winGame());
    } else {
      const newindex = index + 1;
      const payload = {
        newIndex: newindex,
        newQuestion: this.questions[newindex],
        skipFlag: skip
      };
      this.store.dispatch(setQuestion(payload));
      this.startInterval();
    }
  }
  setQuestion() {

  }

  startInterval(): void {
    const maxTime = 20;
    this.store.dispatch(setTimeLeft({newTime: maxTime}));
    if (this.inervalSub && this.inervalSub.unsubscribe) {
      this.inervalSub.unsubscribe();
    }
    // Create an Observable that will publish a value on an interval
    const secondsCounter = interval(1000);
    // Subscribe to begin publishing values
    this.inervalSub = secondsCounter.subscribe(n => {
      const newtime = maxTime - n;
      if (newtime === -1) {
        this.pickanswer('', this.game.currentQuestion);
        return;
      }
      this.store.dispatch(setTimeLeft({newTime: maxTime - n}));
    });
  }
}
