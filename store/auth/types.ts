export interface IUser {
  _id: string
  email: string
  username: string
}

export interface AuthState {
  data?: IUser[]
  isAuth: boolean
  error?: string
}

export enum AuthActionType {
  FETCH_LOGIN = '@auth/FETCH_LOGIN',
  FETCH_USER_INFO = '@auth/FETCH_INFO',
  SET_USER_INFO = '@auth/SET_USER_INFO',
  SET_IS_AUTH = '@auth/SET_IS_AUTH',
  SET_ERROR = '@auth/SET_ERROR'
}
