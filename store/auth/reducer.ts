import produce, { Draft } from 'immer';
import { AuthActionType, AuthState } from './types';

const initialState: AuthState = {
  data: null,
  isAuth: false,
  error: null
};

const user = produce((draft: Draft<AuthState>, action) => {
  switch (action.type) {
    case AuthActionType.FETCH_LOGIN:
      draft.isAuth = false;
      draft.error = null;
      break;

    case AuthActionType.LOGOUT_SUCCESS:
      draft.isAuth = false;
      draft.data = null;
      break;

    case AuthActionType.FETCH_USER_INFO:
      draft.isAuth = false;
      draft.error = null;
      break;

    case AuthActionType.SET_USER_INFO:
      draft.data = action.payload;
      break;

    case AuthActionType.SET_IS_AUTH:
      draft.isAuth = action.payload;
      break;

    case AuthActionType.SET_ERROR:
      draft.error = action.payload;
      break;

    default:
      break;
  }
}, initialState);

export default user;
