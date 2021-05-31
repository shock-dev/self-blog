import { call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AuthActionType } from './types';
import AuthApi from '../../api/auth';
import { logoutSuccess, setError, setIsAuth, setUserInfo } from './actions';

function* fetchLogin(action): SagaIterator {
  try {
    const { payload } = action;
    const { status, data } = yield call(AuthApi.login, payload);

    if (status === 'ok' && data) {
      yield put(setUserInfo(data));
      yield put(setIsAuth(true));
    }
  } catch (e) {
    const { data } = e.response.data;

    if (data) {
      yield put(setError(data));
    } else {
      yield put(setError('Something went wrong, try again'));
    }
  }
}

function* fetchUserInfo(): SagaIterator {
  try {
    const { status, data } = yield call(AuthApi.getMe);

    if (status === 'ok' && data) {
      yield put(setUserInfo(data));
      yield put(setIsAuth(true));
    }
  } catch (e) {
    const { error } = e.response.data;

    if (error) {
      yield put(setError(error));
    } else {
      yield put(setError('Something went wrong, try again'));
    }
  }
}

function* fetchLogout(): SagaIterator {
  try {
    const { status } = yield call(AuthApi.logout);

    if (status === 'ok') {
      yield put(logoutSuccess());
    }
  } catch (e) {
    const { error } = e.response.data;

    if (error) {
      yield put(setError(error));
    } else {
      yield put(setError('Something went wrong, try again'));
    }
  }
}

function* authSaga() {
  yield takeEvery(AuthActionType.FETCH_LOGIN, fetchLogin);
  yield takeEvery(AuthActionType.FETCH_USER_INFO, fetchUserInfo);
  yield takeEvery(AuthActionType.LOGOUT_REQUEST, fetchLogout);
}

export default authSaga;
