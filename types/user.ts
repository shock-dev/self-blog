import { IPost } from './post';

export interface IUser {
  _id: string
  name: string
  surname: string
  email: string
  username: string
  avatarUrl: string
  birthday: string
  bio?: string
  gender: 'male' | 'female'
  posts: IPost[]
  followers: IUser[] & string
  following: IUser[] & string
  createdAt: string
}
