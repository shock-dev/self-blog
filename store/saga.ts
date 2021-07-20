import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import commentsSaga from './comments/saga';
import latestUsersSaga from './latestUsers/saga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    commentsSaga(),
    latestUsersSaga()
  ]);
}
