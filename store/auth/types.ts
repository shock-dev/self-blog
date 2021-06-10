import { IUser } from '../../types/user';

export interface AuthState {
  data: IUser | null
  isAuth: boolean
  isLoading: boolean
  error: string | null
}

export enum AuthActionType {
  FETCH_LOGIN = '@auth/FETCH_LOGIN',
  FETCH_USER_INFO = '@auth/FETCH_USER_INFO',

  REGISTER_REQUEST = '@auth/REGISTER_REQUEST',
  REGISTER_SUCCESS = '@auth/REGISTER_SUCCESS',

  LOGOUT_REQUEST = '@auth/FETCH_LOGOUT',
  LOGOUT_SUCCESS = '@auth/LOGOUT_SUCCESS',

  UPDATE_USER_REQUEST = '@auth/UPDATE_USER_REQUEST',

  SET_USER_INFO = '@auth/SET_USER_INFO',
  SET_IS_AUTH = '@auth/SET_IS_AUTH',
  SET_ERROR = '@auth/SET_ERROR',

  CLEAR_FIELDS = '@auth/CLEAR_FIELDS'
}
