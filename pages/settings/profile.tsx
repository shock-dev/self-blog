import React from 'react';
import SettingsLayout from '../../layouts/SettingsLayout';
import Profile from '../../components/Settings/Profile';
import withAuthSS from '../../hocs/withAuth';

const profileSettings = () => {
  return (
    <SettingsLayout title="Настройки профиля">
      <Profile />
    </SettingsLayout>
  );
};

export const getServerSideProps = withAuthSS(() => {
  return {
    props: {
      protect: true
    }
  };
});

export default profileSettings;
