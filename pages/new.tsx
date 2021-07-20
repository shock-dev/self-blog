import React from 'react';
import CreatePostForm from '../components/CreatePostForm';
import withAuthSS from '../hocs/withAuth';
import ContentLayout from '../layouts/ContentLayout';

interface NewPageProps {
  auth: boolean
}

const NewPage = ({
  auth
}: NewPageProps) => {
  return (
    <ContentLayout title="Создание поста" auth={auth}>
      <CreatePostForm />
    </ContentLayout>
  );
};

export default NewPage;

export const getServerSideProps = withAuthSS();
