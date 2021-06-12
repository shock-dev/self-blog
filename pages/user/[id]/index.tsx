import React from 'react';
import withAuthSS from '../../../hocs/withAuth';
import UsersApi from '../../../api/users';
import { IUser } from '../../../types/user';
import UserInfo from '../../../components/UserInfo';
import ProfileLayout from '../../../layouts/ProfileLayout';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../store/auth/selectors';

interface UserPageProps {
  user: IUser
}

const UserPage = ({
  user
}: UserPageProps) => {
  const me = useSelector(selectAuth).data;
  const isMe = me._id === user._id;
  const pageTitle = isMe ? 'Ваш профиль' : `${user.username} (${user.name} ${user.surname})`;

  return (
    <ProfileLayout title={pageTitle} user={user}>
      <UserInfo
        email={user.email}
        fullname={`${user.name} ${user.surname}`}
        birthday={new Date(user.birthday).toLocaleDateString()}
        postCount={user.posts.length}
        gender={user.gender}
        registerDate={new Date(user.createdAt).toLocaleDateString()}
      />
    </ProfileLayout>
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
