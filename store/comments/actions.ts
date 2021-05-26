import { action } from 'typesafe-actions';
import { CommentsActionType } from './types';
import { IComment } from '../../types/comment';
import { IAddComment } from '../../components/Comments/Form';

export const requestAddComment = (payload: IAddComment) => action(CommentsActionType.REQUEST_ADD_COMMENT, payload);

export const setComments = (payload: IComment[]) => action(CommentsActionType.SET_COMMENTS, payload);

export const setComment = (payload: IComment) => action(CommentsActionType.SET_COMMENT, payload);

export const setError = (payload: string) => action(CommentsActionType.SET_ERROR, payload);
