import { setCookie, destroyCookie } from 'nookies';
import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AuthActionType } from './types';
import AuthApi from '../../api/auth';
import UsersApi from '../../api/users';
import {
  setError,
  setUserInfo
} from './actions';

function* fetchLogin(action): SagaIterator {
  try {
    const { data, router } = action.payload;
    const { data: token } = yield call(AuthApi.login, data);

    yield call(setCookie, null, 'authToken', token, {
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    yield call(router.push, '/');
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
    const { data, router } = action.payload;
    const { year, month, day } = data.birthday;
    const payload = {
      ...data,
      gender: data.gender.value,
      birthday: new Date(year, month, day).toISOString()
    };

    const { data: token } = yield call(AuthApi.register, payload);

    yield call(setCookie, null, 'authToken', token, {
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    yield call(router.push, '/');
  } catch (e) {
    const { message } = e.response.data;

    if (message) {
      yield put(setError(message));
    } else {
      yield put(setError('Something went wrong, try again'));
    }
  }
}

function* fetchLogout(action): SagaIterator {
  try {
    const { router } = action.payload;
    yield call(destroyCookie, null, 'authToken');
    yield call(router.push, '/login');
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
