import Link from 'next/link';
import styles from './Comment.module.scss';
import { IUser } from '../../../types/user';
import Avatar from '../../Avatar';
import { getDifference } from '../../../utils/reformDate';

interface CommentProps {
  text: string
  user: IUser
  createdAt: Date
}

const Comment = ({
  text,
  user,
  createdAt
}: CommentProps) => {
  return (
    <div className={styles.comment}>
      <div className={styles.header}>
        <Link href={`/user/${user._id}`}>
          <a className={styles.user}>
            <Avatar
              url={user.avatarUrl}
              width={20}
              height={20}
              username={user.username}
            />
            <div className={styles.username}>
              {user.username}
            </div>
          </a>
        </Link>
        <div className={styles.time}>
          {getDifference(createdAt)} назад
        </div>
      </div>
      <p className={styles.text}>
        {text}
      </p>
    </div>
  );
};

export default Comment;
