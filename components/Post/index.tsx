import React from 'react';
import Link from 'next/link';
import styles from './Post.module.scss';

export default function Post() {
  return (
    <article className={styles.post}>
      <Link href="/">
        <a className={styles.title}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo
        </a>
      </Link>
      <p className={styles.desc}>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
      </p>
    </article>
  );
}
