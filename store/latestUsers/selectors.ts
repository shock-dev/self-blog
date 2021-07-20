import { RootState } from '../types';

export const selectLatestUser = (state: RootState) => state.latestUsers;

export const selectLatestUserItems = (state: RootState) => selectLatestUser(state).items;

export const selectLatestUserLoading = (state: RootState) => selectLatestUser(state).loading;

export const selectLatestUserError = (state: RootState) => selectLatestUser(state).error;
