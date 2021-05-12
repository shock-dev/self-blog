import React from 'react';
import Link from 'next/link';
import styles from './Post.module.scss';
import { IPost } from '../../store/posts/types';

interface PostProps {
  id: IPost['_id']
  title: IPost['title']
  description: IPost['description']
}

export default function Post({
  id,
  title,
  description
}: PostProps) {
  return (
    <article className={styles.post}>
      <Link href={`/post/${id}`}>
        <a className={styles.title}>
          {title}
        </a>
      </Link>
      <p className={styles.desc}>
        {description}
      </p>
    </article>
  );
}
