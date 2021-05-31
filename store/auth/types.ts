import { IUser } from '../../types/user';

export interface AuthState {
  data: IUser | null
  isAuth: boolean
  isLoading: boolean
  error: string | null
}

export enum AuthActionType {
  FETCH_LOGIN = '@auth/FETCH_LOGIN',
  LOGOUT_REQUEST = '@auth/LOGOUT_REQUEST',
  LOGOUT_SUCCESS = '@auth/LOGOUT_SUCCESS',
  SET_USER_INFO = '@auth/SET_USER_INFO',
  SET_IS_AUTH = '@auth/SET_IS_AUTH',
  SET_ERROR = '@auth/SET_ERROR'
}
