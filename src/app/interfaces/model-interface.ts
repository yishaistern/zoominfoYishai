export interface User {
    userName: string;
    score: number;
}

export interface State {
    currentUser: User;
    users: User[];
}

export interface Question {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    correctIndex: number;
    answers_array: string[];
}

export interface GameState {
    lives: number;
    skipLeft: number;
    currentQuestion: Question;
    counterCorectAnswers: number;
    currentIndex: number;
    howMqntQuestions: number;
    timeLeft: number;
    gameOver: boolean;
    gamewin: boolean;
    didpick: boolean;
}

export interface AppState {
    game: GameState;
    userManage: State;
  }
