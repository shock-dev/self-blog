import { AuthState } from './auth/types';
import { CommentsState } from './comments/types';

export interface RootState {
  user: AuthState
  comments: CommentsState
}
