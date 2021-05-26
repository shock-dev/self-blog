import { RootState } from '../types';

export const selectComments = (state: RootState) => state.comments;

export const selectCommentsData = (state: RootState) => selectComments(state).data;
