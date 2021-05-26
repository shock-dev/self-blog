import { IComment } from '../../types/comment';

export interface CommentsState {
  data: IComment[] | null
}

export enum CommentsActionType {
  SET_COMMENTS = '@comments/SET_COMMENTS'
}
