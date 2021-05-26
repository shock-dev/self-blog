import { IUser } from './user';
import { IComment } from './comment';

export interface IPost {
  _id: string
  title: string
  description: string
  imageUrl: string
  views: number
  comments: IComment[]
  user: IUser
}
