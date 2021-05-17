import { RootState } from '../types';

export const selectAuth = (state: RootState) => state.user;

export const selectIsAuth = (state: RootState) => selectAuth(state).isAuth;
