import produce, { Draft } from 'immer';
import { LatestUsersActionType, LatestUsersState } from './types';

const initialState: LatestUsersState = {
  items: [],
  loading: false,
  error: null
};

const latestUsers = produce((draft: Draft<LatestUsersState>, action) => {
  switch (action.type) {
    case LatestUsersActionType.FETCH_ITEMS:
      draft.error = null;
      draft.loading = true;
      break;

    case LatestUsersActionType.SET_ITEMS:
      draft.items = action.payload;
      break;

    case LatestUsersActionType.SET_LOADING:
      draft.loading = action.payload;
      break;

    case LatestUsersActionType.SET_ERROR:
      draft.error = action.payload;
      break;

    default:
      break;
  }
}, initialState);

export default latestUsers;
