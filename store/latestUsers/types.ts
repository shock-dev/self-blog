import { IUser } from '../../types/user';

export interface LatestUsersState {
  items: IUser[]
  loading: boolean
  error: string | null
}

export enum LatestUsersActionType {
  SET_ITEMS = '@latestUsers/SET_ITEMS',
  FETCH_ITEMS = '@latestUsers/FETCH_ITEMS',
  SET_LOADING = '@latestUsers/SET_LOADING',
  SET_ERROR = '@latestUsers/SET_ERROR'
}
