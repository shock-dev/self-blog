import React from 'react';
import CreatePostForm from '../components/CreatePostForm';
import withAuthSS from '../hocs/withAuth';
import ContentLayout from '../layouts/ContentLayout';
import { IUser } from '../types/user';
import UsersApi from '../api/users';

interface NewPageProps {
  auth: boolean
  lastUsers: IUser[]
  me: IUser
}

const NewPage = ({
  me,
  lastUsers
}: NewPageProps) => {
  return (
    <ContentLayout
      title="Создание поста"
      me={me}
      lastUsers={lastUsers}
    >
      <CreatePostForm me={me} />
    </ContentLayout>
  );
};

export default NewPage;

export const getServerSideProps = withAuthSS(async () => {
  const { data: lastUsers } = await UsersApi.getLatest();

  return {
    props: { lastUsers }
  };
});
