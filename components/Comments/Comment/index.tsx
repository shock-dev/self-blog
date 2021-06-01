import React from 'react';
import Link from 'next/link';
import styles from './Comment.module.scss';
import { IUser } from '../../../types/user';
import Avatar from '../../Avatar';

interface CommentProps {
  text: string
  user: IUser
}

const Comment = ({
  text,
  user
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
              alt={`Аватар ${user.username}`}
            />
            <div className={styles.username}>
              {user.username}
            </div>
          </a>
        </Link>
        <div className={styles.time}>
          Вчера в 15:40
        </div>
      </div>
      <p className={styles.text}>
        {text}
      </p>
    </div>
  );
};

export default Comment;
