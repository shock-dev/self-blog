import { RootState } from '../types';

export const selectAuth = (state: RootState) => state.user;

export const selectIsAuth = (state: RootState) => selectAuth(state).isAuth;

export const selectAuthError = (state: RootState) => selectAuth(state).error;
