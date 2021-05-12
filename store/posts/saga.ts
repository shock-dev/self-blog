import { call, put, takeEvery } from 'redux-saga/effects';
import { PostsActionType } from './types';
import { setPosts } from './actions';
import Api from '../../api/posts';

function* fetchPosts() {
  try {
    const { data } = yield call(Api.getAll);
    yield put(setPosts(data));
  } catch (e) {
    console.log(e);
  }
}

function* postsSaga() {
  yield takeEvery(PostsActionType.FETCH_POSTS, fetchPosts);
}

export default postsSaga;
