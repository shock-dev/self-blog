import { PostsState } from './posts/types';
import { AuthState } from './auth/types';

export interface RootState {
  posts: PostsState,
  user: AuthState
}
