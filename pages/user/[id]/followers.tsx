import React from 'react';
import withAuthSS from '../../../hocs/withAuth';
import UsersApi from '../../../api/users';
import { IUser } from '../../../types/user';
import ProfileLayout from '../../../layouts/ProfileLayout';
import FollowerBox from '../../../components/FollowerBox';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../store/auth/selectors';

interface FollowersPageProps {
  user: IUser
  followers: IUser[]
}

const FollowersPage = ({
  user,
  followers
}: FollowersPageProps) => {
  const me = useSelector(selectAuth).data;
  const isMe = me._id === user._id;
  const pageTitle = isMe ? 'Ваши подписчики' : `${user.username} (${user.name} ${user.surname}) / Подписчики`;

  return (
    <ProfileLayout title={pageTitle} user={user}>
      <FollowerBox
        title="Подписчики"
        list={followers}
        user={user}
      />
    </ProfileLayout>
  );
};

export default FollowersPage;

export const getServerSideProps = withAuthSS(async ({ params }) => {
  try {
    const { data: user } = await UsersApi.one(params.id);
    const { data: followers } = await UsersApi.getFollowers(params.id);
    return {
      props: {
        user,
        followers
      }
    };
  } catch (e) {
    return {
      props: {}
    };
  }
});

