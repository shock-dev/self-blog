import { AuthState } from './auth/types';
import { CommentsState } from './comments/types';
import { LatestUsersState } from './latestUsers/types';

export interface RootState {
  user: AuthState
  latestUsers: LatestUsersState
  comments: CommentsState
}
