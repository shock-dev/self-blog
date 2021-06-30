import React, { useState } from 'react';
import cn from 'classnames';
import Head from 'next/head';
import Header from '../../components/Header';
import styles from './ProfileLayout.module.scss';
import Avatar from '../../components/Avatar';
import Link from 'next/link';
import Button from '../../components/Button';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../store/auth/selectors';
import UsersApi from '../../api/users';
import { IUser } from '../../types/user';

interface ProfileLayoutProps {
  title: string
  children: React.ReactNode
  user: IUser
}

export default function ProfileLayout({
  title,
  children,
  user
}: ProfileLayoutProps) {
  const alert = useAlert();
  const me = useSelector(selectAuth).data;
  const [followersCount, setFollowersCount] = useState(user.followers.length);
  const [isFollower, setIsFollower] = useState(user.followers.includes(me._id));
  const [loading, setLoading] = useState(false);

  const followHandler = async () => {
    try {
      setLoading(true);
      await UsersApi.follow(user._id);
      setFollowersCount((prev) => ++prev);
      setIsFollower(true);
    } catch (e) {
      alert.error('Не удалось подписаться. Попробуйте снова');
    } finally {
      setLoading(false);
    }
  };

  const unfollowHandler = async () => {
    try {
      setLoading(true);
      await UsersApi.unfollow(user._id);
      setFollowersCount((prev) => --prev);
      setIsFollower(false);
    } catch (e) {
      alert.error('Не удалось отписаться. Попробуйте снова');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div className={cn('container', styles.page)}>
        <div className={styles.wrapper}>
          <div className={styles.user}>
            <Avatar
              url={user.avatarUrl}
              type="circle"
              username={user.username}
              width={260}
              height={260}
              additionalStyles={{ margin: '0 0 15px' }}
            />
            <h4 className={styles.fullname}>
              {user.name} {user.surname}
            </h4>
            <h4 className={styles.username}>
              @{user.username}
            </h4>
            <div className={styles.followersWrapper}>
              <Link href={`/user/${user._id}/followers`}>
                <a className={styles.followersLink}>
                  <img
                    src="/images/followers.svg"
                    alt="Followers"
                    style={{ marginRight: '5px' }}
                  />
                  {followersCount} Подписчиков
                </a>
              </Link>
              <Link href={`/user/${user._id}/following`}>
                <a>{user.following.length} Подписок</a>
              </Link>
            </div>
            {me._id !== user._id && (
              isFollower ? (
                <Button
                  customStyles={{ marginTop: '20px' }}
                  onClick={unfollowHandler}
                  loading={loading}
                  outline
                  full
                >
                  Описаться
                </Button>
              ) : (
                <Button
                  customStyles={{ marginTop: '20px' }}
                  onClick={followHandler}
                  loading={loading}
                  full
                >
                  Подписаться
                </Button>
              )
            )}
          </div>
          <div className={styles.children}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
