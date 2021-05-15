import { combineReducers } from 'redux';
import { RootState } from './types';
import posts from './posts/reducer';
import user from './auth/reducer';

const reducer = combineReducers<RootState>({
  posts,
  user
});

export default reducer;
