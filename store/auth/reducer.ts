import produce, { Draft } from 'immer';
import { AuthActionType, AuthState } from './types';

const initialState: AuthState = {
  data: undefined,
  isAuth: false
};

const user = produce((draft: Draft<AuthState>, action) => {
  switch (action.type) {
    case AuthActionType.SET_USER_INFO:
      draft.data = action.payload;
      break;

    case AuthActionType.SET_IS_AUTH:
      draft.isAuth = action.payload;
      break;

    default:
      break;
  }
}, initialState);

export default user;
