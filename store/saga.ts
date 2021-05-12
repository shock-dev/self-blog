import { all } from 'redux-saga/effects';
import postsSaga from './posts/saga';

export default function* rootSaga() {
  yield all([
    postsSaga()
  ]);
}
