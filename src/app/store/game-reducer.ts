import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { State, GameState, AppState } from '../interfaces/model-interface';
import * as actions from './actions';
export const initialState: GameState = {
    counterCorectAnswers: 0,
    currentIndex: 0,
    currentQuestion: null,
    gameOver: false,
    howMqntQuestions: 0,
    lives: 3,
    skipLeft: 3,
    timeLeft: 20,
    gamewin: false,
    didpick: false
};

const gameActionReducer = createReducer(
    initialState,
    on(actions.cleerGame, state => ({ ...initialState })),
    on(actions.setTimeLeft, (state, { newTime }) => ({ ...state, timeLeft: (newTime > 0) ? newTime : 0  })),
    on(actions.setQuestion, (state, { newQuestion, newIndex, skipFlag }) => (
        {
            ...state,
            currentIndex: newIndex,
            didpick: false,
            currentQuestion: newQuestion,
            skipLeft: (skipFlag) ? state.skipLeft - 1 : state.skipLeft
        })
    ),
    on(actions.resetGame, (state, { newQuestion, howMany, }) => (
        {
            ...state,
            ...initialState,
            currentQuestion: newQuestion,
            howMqntQuestions: howMany,
        })
    ),
    on(actions.rongAnswer, (state) => ({
        ...state,
        didpick: true,
        gameOver: (state.lives === 1) ? true : false,
        lives: state.lives - 1
    })),
    on(actions.correctAnswer, (state) => ({ ...state, counterCorectAnswers: state.counterCorectAnswers + 1, didpick: true, })),
    on(actions.winGame, (state) => ({ ...state, gamewin: true })),
);

export function gameReducer(state: GameState | undefined, action: Action) {
    return gameActionReducer(state, action);
}


export const selectFeature = createFeatureSelector<AppState, GameState>('game');

export const selectGame = createSelector(
  selectFeature,
  (state: GameState) => state
);

export const selectTime = createSelector(
    selectFeature,
    (state: GameState) => state.timeLeft
  );
