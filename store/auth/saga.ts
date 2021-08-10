import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AuthActionType } from './types';
import AuthApi from '../../api/auth';
import UsersApi from '../../api/users';
import { setError, setUserInfo } from './actions';

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
  yield takeLatest(AuthActionType.FETCH_USER_INFO, fetchUserInfo);
  yield takeLatest(AuthActionType.UPDATE_USER_REQUEST, fetchUpdateUser);
}

export default authSaga;
