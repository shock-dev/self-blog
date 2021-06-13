import React from 'react';
import ContentLayout from '../layouts/ContentLayout';
import CreatePostForm from '../components/CreatePostForm';
import withAuthSS from '../hocs/withAuth';

const NewPage = () => {
  return (
    <ContentLayout title="Создание поста">
      <CreatePostForm />
    </ContentLayout>
  );
};

export default NewPage;

export const getServerSideProps = withAuthSS();
