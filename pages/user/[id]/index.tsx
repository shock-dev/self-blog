import React from 'react';
import withAuthSS from '../../../hocs/withAuth';
import UsersApi from '../../../api/users';
import { IUser } from '../../../types/user';
import UserInfo from '../../../components/UserInfo';
import ProfileLayout from '../../../layouts/ProfileLayout';

interface UserPageProps {
  user: IUser
}

const UserPage = ({
  user
}: UserPageProps) => {
  return (
    <ProfileLayout title={user.username} user={user}>
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
