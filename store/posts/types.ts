export interface IPost {
  id: string
  title: string
  description: string
}

export interface PostsState {
  data: IPost[]
}
