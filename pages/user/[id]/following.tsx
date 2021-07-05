import React from 'react';
import withAuthSS from '../../../hocs/withAuth';
import UsersApi from '../../../api/users';
import { IUser } from '../../../types/user';
import ProfileLayout from '../../../layouts/ProfileLayout';
import FollowerBox from '../../../components/FollowerBox';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../store/auth/selectors';

interface FollowingPageProps {
  user: IUser
  following: IUser[]
  auth: boolean
}

const FollowingPage = ({
  user,
  following,
  auth
}: FollowingPageProps) => {
  const me = useSelector(selectAuth).data;
  const isMe = me?._id === user._id;
  const pageTitle = isMe ? 'Ваши подписки' : `${user.username} (${user.name} ${user.surname}) / Подписки`;

  return (
    <ProfileLayout title={pageTitle} user={user} auth={auth}>
      <FollowerBox
        title="Подписки"
        list={following}
        user={user}
        auth={auth}
      />
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

