import React from 'react';
import Link from 'next/link';
import styles from './Comment.module.scss';

interface CommentProps {
  text: string
  user: {
    username: string
    avatarUrl: string
  }
}

const Comment = ({
  text,
  user: {
    username,
    avatarUrl
  }
}: CommentProps) => {
  return (
    <div className={styles.comment}>
      <div className={styles.header}>
        <Link href="/">
          <a className={styles.user}>
            <img
              className={styles.avatar}
              src={avatarUrl}
              alt=""
            />
            <div className={styles.username}>
              {username}
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
