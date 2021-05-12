export interface IPost {
  _id: string
  title: string
  description: string
}

export interface PostsState {
  data: IPost[]
}

export enum PostsActionType {
  FETCH_POSTS = '@posts/FETCH_POSTS',
  SET_POSTS = '@posts/SET_POSTS'
}
