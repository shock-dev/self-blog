import React from 'react';
import styles from './Comments.module.scss';
import Comment from './Comment';
import Form from './Form';

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
      <p className={styles.title}>
        Комментарии <span>{count}</span>
      </p>
      {children}
    </div>
  );
};

Comments.Item = Comment;
Comments.Form = Form;

export default Comments;
