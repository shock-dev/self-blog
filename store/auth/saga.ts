import { call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AuthActionType } from './types';
import AuthApi from '../../api/auth';
import { setError, setIsAuth, setUserInfo } from './actions';

function* fetchLogin(action): SagaIterator {
  try {
    const { payload } = action;
    const { status, data } = yield call(AuthApi.login, payload);

    if (status === 'ok' && data) {
      localStorage.setItem('authToken', `Bearer ${data}`);
    }
  } catch (e) {
    const { message } = e.response.data;

    if (message) {
      yield put(setError(message));
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

function* authSaga() {
  yield takeEvery(AuthActionType.FETCH_LOGIN, fetchLogin);
  yield takeEvery(AuthActionType.FETCH_USER_INFO, fetchUserInfo);
}

export default authSaga;
