import produce, { Draft } from 'immer';
import { CommentsActionType, CommentsState } from './types';

const initialState: CommentsState = {
  data: [],
  error: null
};

const comments = produce((draft: Draft<CommentsState>, action) => {
  switch (action.type) {
    case CommentsActionType.SET_COMMENTS:
      draft.data = action.payload;
      break;

    case CommentsActionType.SET_COMMENT:
      draft.data.push(action.payload);
      break;

    case CommentsActionType.SET_ERROR:
      draft.error = action.payload;
      break;

    default:
      break;
  }
}, initialState);

export default comments;
