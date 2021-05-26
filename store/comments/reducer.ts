import produce, { Draft } from 'immer';
import { CommentsActionType, CommentsState } from './types';

const initialState: CommentsState = {
  data: null
};

const comments = produce((draft: Draft<CommentsState>, action) => {
  switch (action.type) {
    case CommentsActionType.SET_COMMENTS:
      draft.data = action.payload;
      break;

    default:
      break;
  }
}, initialState);

export default comments;
