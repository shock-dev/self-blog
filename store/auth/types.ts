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

  ADD_AVATAR_REQUEST = '@auth/ADD_AVATAR_REQUEST',
  ADD_AVATAR_SUCCESS = '@auth/ADD_AVATAR_SUCCESS',

  SET_USER_INFO = '@auth/SET_USER_INFO',
  SET_IS_AUTH = '@auth/SET_IS_AUTH',
  SET_ERROR = '@auth/SET_ERROR',

  CLEAR_FIELDS = '@auth/CLEAR_FIELDS'
}
