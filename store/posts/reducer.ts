import produce, { Draft } from 'immer';
import { PostsState } from './types';

const initialState: PostsState = {
  data: []
};

const posts = produce((draft: Draft<PostsState>, action) => {
  switch (action.type) {
    default:
      break;
  }
}, initialState);

export default posts;
