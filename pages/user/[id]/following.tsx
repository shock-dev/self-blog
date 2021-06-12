import React from 'react';
import withAuthSS from '../../../hocs/withAuth';
import UsersApi from '../../../api/users';
import { IUser } from '../../../types/user';
import ProfileLayout from '../../../layouts/ProfileLayout';
import FollowerBox from '../../../components/FollowerBox';

interface FollowingPageProps {
  user: IUser
  following: IUser[]
}

const FollowingPage = ({
  user,
  following
}: FollowingPageProps) => {
  return (
    <ProfileLayout title={`${user.username} - Подписчики`} user={user}>
      <FollowerBox title="Подписки" list={following} />
    </ProfileLayout>
  );
};

export default FollowingPage;

export const getServerSideProps = withAuthSS(async ({ params }) => {
  try {
    const { data: user } = await UsersApi.one(params.id);
    const { data: following } = await UsersApi.getFollowing(params.id);
    return {
      props: {
        user,
        following
      }
    };
  } catch (e) {
    return {
      props: {}
    };
  }
});

