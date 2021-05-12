export interface IPost {
  _id: string
  title: string
  description: string
}

export interface PostsState {
  data: IPost[]
}
