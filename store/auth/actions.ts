import { action } from 'typesafe-actions';
import { AuthActionType } from './types';
import { IUser } from '../../types/user';
import { RegisterFormInputs } from '../../pages/register';
import { UpdateFormInputs } from '../../components/Settings/Profile';

export const fetchUserInfo = (token: string) => action(AuthActionType.FETCH_USER_INFO, token);

export const registerRequest = (data: RegisterFormInputs, router) => action(AuthActionType.REGISTER_REQUEST, { data, router });

export const updateUserRequest = (data: UpdateFormInputs) => action(AuthActionType.UPDATE_USER_REQUEST, data);

export const logoutRequest = (router) => action(AuthActionType.LOGOUT_REQUEST, { router });

export const logoutSuccess = () => action(AuthActionType.LOGOUT_SUCCESS);

export const setUserInfo = (payload: IUser) => action(AuthActionType.SET_USER_INFO, payload);

export const setIsAuth = (payload: boolean) => action(AuthActionType.SET_IS_AUTH, payload);

export const setError = (payload: string) => action(AuthActionType.SET_ERROR, payload);

export const clearFields = () => action(AuthActionType.CLEAR_FIELDS);
