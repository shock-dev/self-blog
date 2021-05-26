import React from 'react';
import styles from './Comments.module.scss';
import Item from './Comment';

interface CommentsProps {
  children?: React.ReactNode
  count: number
}

const Comments = ({
  children,
  count
}: CommentsProps) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Комментарии <span>{count}</span></p>
      {children}
    </div>
  );
};

Comments.Item = Item;

export default Comments;
