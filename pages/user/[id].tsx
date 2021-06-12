import React, { useState } from 'react';
import Link from 'next/link';
import withAuthSS from '../../hocs/withAuth';
import MainLayout from '../../layouts/MainLayout';
import UsersApi from '../../api/users';
import styles from '../../styles/pages/User.module.scss';
import { IUser } from '../../types/user';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import UserInfo from '../../components/UserInfo';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../store/auth/selectors';
import { useAlert } from 'react-alert';

interface UserPageProps {
  user: IUser
}

const UserPage = ({
  user
}: UserPageProps) => {
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
    <MainLayout title={user.username}>
      <div className={styles.wrapper}>
        <div className={styles.user}>
          <Avatar
            url={user.avatarUrl}
            type="circle"
            username={user.username}
          />
          <h4 className={styles.username}>
            {user.username}
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
        <UserInfo
          email={user.email}
          fullname={`${user.name} ${user.surname}`}
          birthday={new Date(user.birthday).toLocaleDateString()}
          postCount={user.posts.length}
          gender={user.gender}
          registerDate={new Date(user.createdAt).toLocaleDateString()}
        />
      </div>
    </MainLayout>
  );
};

export default UserPage;

export const getServerSideProps = withAuthSS(async ({ params }) => {
  try {
    const { data } = await UsersApi.one(params.id);
    return {
      props: {
        user: data
      }
    };
  } catch (e) {
    return {
      props: {}
    };
  }
});
