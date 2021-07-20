import { call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { LatestUsersActionType } from './types';
import UsersApi from '../../api/users';
import { setError, setLatestUsers, setLatestUsersLoading } from './actions';

function* fetchLatestUsers(action): SagaIterator {
  try {
    const { status, data } = yield call(UsersApi.getLatest, action.payload);

    if (status === 'ok') {
      yield put(setLatestUsers(data));
    }
  } catch (e) {
    const { error } = e.response.data;

    if (error) {
      yield put(setError(error));
    } else {
      yield put(setError('Something went wrong, try again'));
    }
  } finally {
    yield put(setLatestUsersLoading(false));
  }
}

function* latestUsersSaga() {
  yield takeEvery(LatestUsersActionType.FETCH_ITEMS, fetchLatestUsers);
}

export default latestUsersSaga;
