import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AuthActionType } from './types';
import AuthApi from '../../api/auth';
import UsersApi from '../../api/users';
import {
  logoutSuccess,
  registerSuccess,
  setError,
  setIsAuth,
  setUserInfo
} from './actions';

function* fetchLogin(action): SagaIterator {
  try {
    const { payload } = action;
    const { data } = yield call(AuthApi.login, payload);

    yield put(setUserInfo(data));
    yield put(setIsAuth(true));
  } catch (e) {
    const { data } = e.response.data;

    if (data) {
      yield put(setError(data));
    } else {
      yield put(setError('Something went wrong, try again'));
    }
  }
}

function* fetchUserInfo(action) {
  try {
    const { data } = yield call(AuthApi.getMe, action.payload);
    yield put(setUserInfo(data));
  } catch (e) {
    const { data } = e.response.data;
    if (data) {
      yield put(setError(data));
    } else {
      yield put(setError('Something went wrong, try again'));
    }
  }
}

function* fetchRegister(action): SagaIterator {
  try {
    const { year, month, day } = action.payload.birthday;
    const payload = {
      ...action.payload,
      birthday: new Date(year, month, day).toLocaleDateString()
    };
    const { data } = yield call(AuthApi.register, payload);
    yield put(registerSuccess(data));
  } catch (e) {
    const { message } = e.response.data;

    if (message) {
      yield put(setError(message));
    } else {
      yield put(setError('Something went wrong, try again'));
    }
  }
}

function* fetchLogout(): SagaIterator {
  try {
    yield call(AuthApi.logout);
    yield put(logoutSuccess());
  } catch (e) {
    const { message } = e.response.data;

    if (message) {
      yield put(setError(message));
    } else {
      yield put(setError('Something went wrong, try again'));
    }
  }
}

function* fetchUpdateUser(action): SagaIterator {
  try {
    const { data } = yield call(UsersApi.update, action.payload);
    yield put(setUserInfo(data));
  } catch (e) {
    const { message } = e.response.data;

    if (message) {
      yield put(setError(message));
    } else {
      yield put(setError('Something went wrong, try again'));
    }
  }
}

function* authSaga() {
  yield takeLatest(AuthActionType.FETCH_LOGIN, fetchLogin);
  yield takeLatest(AuthActionType.FETCH_USER_INFO, fetchUserInfo);
  yield takeLatest(AuthActionType.REGISTER_REQUEST, fetchRegister);
  yield takeLatest(AuthActionType.LOGOUT_REQUEST, fetchLogout);
  yield takeLatest(AuthActionType.UPDATE_USER_REQUEST, fetchUpdateUser);
}

export default authSaga;
