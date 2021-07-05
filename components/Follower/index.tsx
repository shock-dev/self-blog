import React, { CSSProperties, useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useAlert } from 'react-alert';
import styles from './Follower.module.scss';
import Avatar from '../Avatar';
import UsersApi from '../../api/users';

interface FollowerProps {
  id: string
  avatarUrl?: string
  username: string
  name: string
  surname: string
  isMe: boolean
  isFollow: boolean
  hideBtn?: boolean
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
  hideBtn,
  customStyles = {}
}: FollowerProps) => {
  const alert = useAlert();
  const [isLocalFollow, setIsLocalFollow] = useState(isFollow);

  const followHandler = async () => {
    try {
      await UsersApi.follow(id);
      setIsLocalFollow(true);
    } catch (e) {
      alert.error('Не удалось подписаться');
    }
  };

  const unfollowHandler = async () => {
    try {
      await UsersApi.unfollow(id);
      setIsLocalFollow(false);
    } catch (e) {
      alert.error('Не удалось отписаться');
    }
  };

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
              <a>@{username}</a>
            </Link>
          </p>
        </div>
      </div>
      {hideBtn && (
        !isMe && (
          isLocalFollow ? (
            <button
              className={cn(styles.follow, styles.followActive)}
              title="Отписаться"
              onClick={unfollowHandler}
            >
              <svg width={16} height={16}>
                <use href="/images/[global].svg#follow" />
              </svg>
            </button>
          ) : (
            <button
              className={styles.follow}
              title="Подписаться"
              onClick={followHandler}
            >
              <svg width={16} height={16}>
                <use href="/images/[global].svg#follow" />
              </svg>
            </button>
          )
        )
      )}
    </div>
  );
};

export default Follower;
