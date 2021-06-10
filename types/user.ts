import { IPost } from './post';

export interface IUser {
  _id: string
  fullname: string
  email: string
  username: string
  avatarUrl: string
  birthday: string
  posts: IPost[]
  createdAt: string
}
