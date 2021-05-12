import produce, { Draft } from 'immer';
import { PostsActionType, PostsState } from './types';

const initialState: PostsState = {
  data: []
};

const posts = produce((draft: Draft<PostsState>, action) => {
  switch (action.type) {
    case PostsActionType.SET_POSTS:
      draft.data = action.payload;
      break;
    default:
      break;
  }
}, initialState);

export default posts;
