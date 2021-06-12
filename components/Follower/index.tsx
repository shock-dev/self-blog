import React, { CSSProperties } from 'react';
import Link from 'next/link';
import styles from './Follower.module.scss';
import Avatar from '../Avatar';
import cn from 'classnames';

interface FollowerProps {
  id: string
  avatarUrl?: string
  username: string
  name: string
  surname: string
  isMe: boolean
  isFollow: boolean
  customStyles?: CSSProperties
}

const Follower = ({
  id,
  avatarUrl,
  username,
  name,
  surname,
  isMe,
  isFollow,
  customStyles = {}
}: FollowerProps) => {
  return (
    <div className={styles.wrapper} style={customStyles}>
      <div className={styles.info}>
        <Avatar
          url={avatarUrl}
          username={username}
          width={50}
          height={50}
          type="circle"
          additionalStyles={{ marginRight: '10px' }}
        />
        <div>
          <Link href={`/user/${id}`}>
            <a className={styles.fullname}>
              {name} {surname}
            </a>
          </Link>
          <p className={styles.username}>
            <Link href={`/user/${id}`}>
              <a>{username}</a>
            </Link>
          </p>
        </div>
      </div>
      {!isMe && (
        isFollow ? (
          <button className={cn(styles.follow, styles.followActive)}>
            <svg width={16} height={16}>
              <use href="/images/[global].svg#follow" />
            </svg>
          </button>
        ) : (
          <button className={styles.follow}>
            <svg width={16} height={16}>
              <use href="/images/[global].svg#follow" />
            </svg>
          </button>
        )
      )}
    </div>
  );
};

export default Follower;
