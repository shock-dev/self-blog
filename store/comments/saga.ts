import { call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { CommentsActionType } from './types';
import CommentsApi from '../../api/comments';
import { setComment, setError } from './actions';

function* fetchAddComment(action): SagaIterator {
  try {
    const { status, data } = yield call(CommentsApi.create, action.payload);

    if (status === 'ok') {
      yield put(setComment(data));
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

function* commentsSaga() {
  yield takeEvery(CommentsActionType.REQUEST_ADD_COMMENT, fetchAddComment);
}

export default commentsSaga;
