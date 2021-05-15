import { call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AuthActionType } from './types';
import AuthApi from '../../api/auth';
import { setError } from './actions';

function* login(action): SagaIterator {
  try {
    const { payload } = action;
    const { status, data } = yield call(AuthApi.login, payload);

    if (status === 'ok') {
      localStorage.setItem('authToken', `Bearer ${data}`);
    }
  } catch (e) {
    const { message } = e.response.data;

    if (message) {
      put(setError(message));
    } else {
      put(setError('something went wrong, try again'));
    }
  }
}

function* authSaga() {
  yield takeEvery(AuthActionType.FETCH_LOGIN, login);
}

export default authSaga;
