import { action } from 'typesafe-actions';
import { IPost, PostsActionType } from './types';

export const fetchPosts = () => action(PostsActionType.FETCH_POSTS);

export const setPosts = (payload: IPost[]) => action(PostsActionType.SET_POSTS, payload);
