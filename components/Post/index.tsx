import React from 'react';
import Link from 'next/link';
import styles from './Post.module.scss';

interface PostProps {
  id: string
  title: string
  description: string
  imageUrl: string
  views: number
  author: {
    username: string
    avatarUrl: string
  }
}

export default function Post({
  id,
  title,
  description,
  imageUrl,
  views,
  author: {
    username,
    avatarUrl
  }
}: PostProps) {
  const postUrl = `/post/${id}`;

  return (
    <article className={styles.post}>
      <div className={styles.header}>
        <img className={styles.avatar} src={avatarUrl} alt={`${username} avatar`} />
        <div className={styles.userWrapper}>
          <Link href="/">
            <a className={styles.username}>{username}</a>
          </Link>
          <div className={styles.time}>
            Вчера в 15:40
          </div>
        </div>
      </div>
      <Link href={postUrl}>
        <a>
          <h2 className={styles.title}>
            {title}
          </h2>
        </a>
      </Link>
      <ul className={styles.categories}>
        <li className={styles.category}>
          <Link href="/">
            <a className={styles.categoryLink}>
              Компьютерное железо
            </a>
          </Link>
        </li>
        <li className={styles.category}>
          <Link href="/">
            <a className={styles.categoryLink}>
              Презентации
            </a>
          </Link>
        </li>
      </ul>
      <img className={styles.img} src={imageUrl} alt={title} />
      <p className={styles.text}>
        {description}
      </p>
      <div className={styles.footer}>
        <Link href={postUrl}>
          <a className={styles.link}>Читать далее</a>
        </Link>
        <ul className={styles.panel}>
          <li className={styles.panelItem}>
            <svg className={styles.panelIcon} width="26px" height="18px">
              <use href={`images/[post].svg#views`} />
            </svg>
            {views}
          </li>
          <li className={styles.panelItem}>
            <Link href="/">
              <a className={styles.panelItem}>
                <svg className={styles.panelIcon} width="26px" height="18px">
                  <use href={`images/[post].svg#comments`} />
                </svg>
                3
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </article>
  );
}
