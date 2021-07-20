import { action } from 'typesafe-actions';
import { LatestUsersActionType } from './types';
import { IUser } from '../../types/user';

export const fetchLatestUsers = (limit: number = 5) => action(LatestUsersActionType.FETCH_ITEMS, limit);

export const setLatestUsers = (payload: IUser[]) => action(LatestUsersActionType.SET_ITEMS, payload);

export const setLatestUsersLoading = (flag: boolean) => action(LatestUsersActionType.SET_LOADING, flag);

export const setError = (payload: string) => action(LatestUsersActionType.SET_ERROR, payload);
