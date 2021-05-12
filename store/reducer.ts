import { combineReducers } from 'redux';
import { RootState } from './types';
import posts from './posts/reducer';

const reducer = combineReducers<RootState>({
  posts
});

export default reducer;
