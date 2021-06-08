import { action } from 'typesafe-actions';
import { AuthActionType } from './types';
import { LoginFormInputs } from '../../pages/login';
import { IUser } from '../../types/user';
import { RegisterFormInputs } from '../../pages/register';

export const fetchLogin = (payload: LoginFormInputs) => action(AuthActionType.FETCH_LOGIN, payload);

export const fetchUserInfo = (token: string) => action(AuthActionType.FETCH_USER_INFO, token);

export const registerRequest = (payload: RegisterFormInputs) => action(AuthActionType.REGISTER_REQUEST, payload);

export const registerSuccess = (data: IUser) => action(AuthActionType.REGISTER_SUCCESS, data);

export const logoutRequest = () => action(AuthActionType.LOGOUT_REQUEST);

export const logoutSuccess = () => action(AuthActionType.LOGOUT_SUCCESS);

export const addAvatarRequest = (file: File) => action(AuthActionType.ADD_AVATAR_REQUEST, file);

export const addAvatarSuccess = (payload: IUser) => action(AuthActionType.ADD_AVATAR_SUCCESS, payload);

export const setUserInfo = (payload: IUser) => action(AuthActionType.SET_USER_INFO, payload);

export const setIsAuth = (payload: boolean) => action(AuthActionType.SET_IS_AUTH, payload);

export const setError = (payload: string) => action(AuthActionType.SET_ERROR, payload);

export const clearFields = () => action(AuthActionType.CLEAR_FIELDS);
