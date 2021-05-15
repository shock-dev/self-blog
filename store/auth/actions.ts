import { action } from 'typesafe-actions';
import { IUser, AuthActionType } from './types';
import { LoginFormInputs } from '../../pages/login';

export const fetchLogin = (payload: LoginFormInputs) => action(AuthActionType.FETCH_LOGIN, payload);

export const fetchUserInfo = () => action(AuthActionType.FETCH_USER_INFO);

export const setUserInfo = (payload: IUser) => action(AuthActionType.SET_USER_INFO, payload);

export const setIsAuth = (payload: boolean) => action(AuthActionType.SET_IS_AUTH, payload);

export const setError = (payload: string) => action(AuthActionType.SET_ERROR, payload);
