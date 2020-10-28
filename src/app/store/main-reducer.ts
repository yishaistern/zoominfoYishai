import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { AppState, State, User } from '../interfaces/model-interface';
import * as actions from './actions';
export const initialState: State = {
    currentUser: { score: 0, userName: ''},
    users: []
};

const userReducer = createReducer(
    initialState,
    on(actions.storedUsers, (state, { oldUsers}) => {
        let newArr = [...oldUsers];
        newArr = newArr.sort((a: User, b: User) => {
            return a.score < b.score ? 1 : -1;
        });
        return {...state, users: (newArr) ? newArr : [] };
    }),
    on(actions.addUser, (state, { userName }) => {

        const newUser: User = {score: 0 , userName};
        return { ...state, currentUser: newUser, };
    }),
    on(actions.userScore, (state, { score }) => {

        const newUser: User = {score: score , userName: state.currentUser.userName};
        let arr = [...state.users, newUser];
        arr = arr.sort((a: User, b: User) => {
            return a.score < b.score ? 1 : -1;
        });
        if (arr.length > 10) {
            arr.length = 10;
        }
        if (localStorage) {
            localStorage.setItem('users', JSON.stringify(arr));
        }
        return { ...state, users: arr };
    }),
);

export function reducer(state: State | undefined, action: Action) {
    return userReducer(state, action);
}

export const selectFeature = createFeatureSelector<AppState, State>('userManage');

export const selectusers = createSelector(
  selectFeature,
  (state: State) => state.users
);

export const selectCurrentuser = createSelector(
    selectFeature,
    (state: State) => state.currentUser.userName
  );

