import React from 'react';
import CreatePostForm from '../components/CreatePostForm';
import withAuthSS from '../hocs/withAuth';
import MainLayout from '../layouts/MainLayout';

const NewPage = () => {
  return (
    <MainLayout title="Создание поста">
      <CreatePostForm />
    </MainLayout>
  );
};

export default NewPage;

export const getServerSideProps = withAuthSS();
