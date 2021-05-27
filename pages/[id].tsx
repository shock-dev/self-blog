import React from 'react';
import withAuthSS from '../hocs/withAuth';
import MainLayout from '../layouts/MainLayout';

const UserPage = () => {
  return (
    <MainLayout title="Profile">
      test
    </MainLayout>
  );
};

export default UserPage;

export const getServerSideProps = withAuthSS();
