import React from 'react';
import Link from 'next/link';
import styles from './Post.module.scss';

export default function Post() {
  return (
    <article className={styles.post}>
      <div>
        <div className={styles.head}>
          <img className={styles.avatar} src="https://res.cloudinary.com/demo/image/upload/w_40,h_40,c_fill/sample.jpg" alt="" />
          <div className={styles.userWrapper}>
            <Link href="/">
              <a className={styles.username}>shock-dev</a>
            </Link>
            <div className={styles.time}>
              Вчера в 15:40
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
