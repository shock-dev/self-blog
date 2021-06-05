import produce, { Draft } from 'immer';
import { AuthActionType, AuthState } from './types';

const initialState: AuthState = {
  data: null,
  isAuth: false,
  isLoading: false,
  error: null
};

const user = produce((draft: Draft<AuthState>, action) => {
  switch (action.type) {
    case AuthActionType.FETCH_LOGIN:
      draft.isAuth = false;
      draft.isLoading = true;
      draft.error = null;
      break;

    case AuthActionType.LOGOUT_SUCCESS:
      draft.isLoading = false;
      draft.error = null;
      draft.isAuth = false;
      draft.data = null;
      break;

    case AuthActionType.REGISTER_REQUEST:
      draft.error = null;
      draft.isLoading = true;
      break;

    case AuthActionType.REGISTER_SUCCESS:
      draft.error = null;
      draft.isLoading = false;
      draft.isAuth = true;
      draft.data = action.payload;
      break;

    case AuthActionType.SET_USER_INFO:
      draft.data = action.payload;
      draft.isAuth = true;
      draft.error = null;
      draft.isLoading = false;
      break;

    case AuthActionType.SET_ERROR:
      draft.error = action.payload;
      draft.isLoading = false;
      break;

    case AuthActionType.CLEAR_FIELDS:
      draft.error = null;
      draft.isLoading = false;
      break;

    default:
      break;
  }
}, initialState);

export default user;
