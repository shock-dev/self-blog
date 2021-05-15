import { all } from 'redux-saga/effects';
import postsSaga from './posts/saga';
import authSaga from './auth/saga';

export default function* rootSaga() {
  yield all([
    postsSaga(),
    authSaga()
  ]);
}
