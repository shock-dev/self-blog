import React from 'react';
import withAuthSS from '../../../hocs/withAuth';
import UsersApi from '../../../api/users';
import { IUser } from '../../../types/user';
import ProfileLayout from '../../../layouts/ProfileLayout';
import FollowerBox from '../../../components/FollowerBox';

interface FollowersPageProps {
  user: IUser
  followers: IUser[]
}

const FollowersPage = ({
  user,
  followers
}: FollowersPageProps) => {
  return (
    <ProfileLayout title={`${user.username} - Подписчики`} user={user}>
      <FollowerBox title="Подписчики" list={followers} />
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

