import { takeEvery } from 'redux-saga/effects';

function* fetchPosts() {
  console.log('test');
}

function* postsSaga() {
  yield takeEvery('FETCH_POSTS', fetchPosts);
}

export default postsSaga;
