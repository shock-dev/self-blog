import { action } from 'typesafe-actions';
import { CommentsActionType } from './types';
import { IComment } from '../../types/comment';

export const setComments = (payload: IComment[]) => action(CommentsActionType.SET_COMMENTS, payload);
