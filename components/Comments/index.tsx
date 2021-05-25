import React from 'react';
import styles from './Comments.module.scss';
import Item from './Item';

interface CommentsProps {
  children?: React.ReactNode
}

const Comments = ({
  children
}: CommentsProps) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Комментарии <span>2</span></p>
      {children}
    </div>
  );
};

Comments.Item = Item;

export default Comments;
