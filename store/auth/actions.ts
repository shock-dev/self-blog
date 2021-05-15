import { action } from 'typesafe-actions';
import { IUser, AuthActionType } from './types';
import { LoginFormInputs } from '../../pages/login';

export const login = (payload: LoginFormInputs) => action(AuthActionType.FETCH_LOGIN, payload);

export const setUserInfo = (payload: IUser) => action(AuthActionType.SET_USER_INFO, payload);

export const setIsAuth = (payload: boolean) => action(AuthActionType.SET_IS_AUTH, payload);

export const setError = (payload: string) => action(AuthActionType.SET_ERROR, payload);
