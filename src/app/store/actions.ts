import { createAction, props } from '@ngrx/store';
import { Question, User } from '../interfaces/model-interface';

export const addUser = createAction('[Users flow] insert new', props<{userName: string}>());
export const userScore = createAction('[Users flow] userScore', props<{score: number}>());
export const storedUsers = createAction('[Users flow] users Stored', props<{oldUsers: User[]}>());

/** game actions */
export const setTimeLeft = createAction('[Game flow] set time left', props<{newTime: number}>());
export const setQuestion = createAction('[Game flow] set question', props<{newQuestion: Question, newIndex: number, skipFlag?: boolean}>());
export const rongAnswer = createAction('[Game flow] rong answer');
export const cleerGame = createAction('[Game flow] clear game');
export const winGame = createAction('[Game flow] win game');
export const resetGame = createAction('[Game flow] start Game', props<{newQuestion: Question, howMany: number}>());
export const correctAnswer = createAction('[Game flow] correct answer');
