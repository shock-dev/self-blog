import { action } from 'typesafe-actions';
import { AuthActionType } from './types';
import { LoginFormInputs } from '../../pages/login';
import { IUser } from '../../types/user';

export const fetchLogin = (payload: LoginFormInputs) => action(AuthActionType.FETCH_LOGIN, payload);

export const logoutRequest = () => action(AuthActionType.LOGOUT_REQUEST);

export const logoutSuccess = () => action(AuthActionType.LOGOUT_SUCCESS);

export const setUserInfo = (payload: IUser) => action(AuthActionType.SET_USER_INFO, payload);

export const setIsAuth = (payload: boolean) => action(AuthActionType.SET_IS_AUTH, payload);

export const setError = (payload: string) => action(AuthActionType.SET_ERROR, payload);
