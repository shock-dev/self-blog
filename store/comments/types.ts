import { IComment } from '../../types/comment';

export interface CommentsState {
  data: IComment[]
  error: string | null
}

export enum CommentsActionType {
  SET_COMMENTS = '@comments/SET_COMMENTS',
  REQUEST_ADD_COMMENT = '@comments/REQUEST_ADD_COMMENT',
  SET_COMMENT = '@comments/SET_COMMENT',
  SET_ERROR = '@comments/SET_ERROR'
}
