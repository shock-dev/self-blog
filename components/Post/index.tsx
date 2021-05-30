import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import styles from './Post.module.scss';
import { IUser } from '../../types/user';
import Avatar from '../Avatar';

interface PostProps {
  id: string
  title: string
  description: string
  imageUrl: string
  views: number
  withFooter?: boolean
  commentsCount?: number
  isShortText?: boolean
  user: IUser
}

export default function Post({
  id,
  title,
  description,
  imageUrl,
  views,
  withFooter = false,
  commentsCount,
  isShortText = false,
  user
}: PostProps) {
  const postUrl = `/post/${id}`;

  return (
    <article className={styles.post}>
      <div className={styles.header}>
        <Avatar
          url={user.avatarUrl}
          width={40}
          height={40}
          additionalStyles={{ marginRight: '10px' }}
          alt={`Avatar of ${user.username}`}
        />
        <div className={styles.userWrapper}>
          <Link href={`/user/${user._id}`}>
            <a className={styles.username}>{user.username}</a>
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
      <p className={cn(styles.text, { [styles.short]: isShortText })}>
        {description}
      </p>
      {withFooter && (
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
                  {commentsCount}
                </a>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </article>
  );
}
