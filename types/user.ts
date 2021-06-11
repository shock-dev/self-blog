import { IPost } from './post';

export interface IUser {
  _id: string
  name: string
  surname: string
  email: string
  username: string
  avatarUrl: string
  birthday: string
  gender: 'male' | 'female'
  posts: IPost[]
  createdAt: string
}
