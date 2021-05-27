import React from 'react';
import SettingsLayout from '../../layouts/SettingsLayout';
import Profile from '../../components/Settings/Profile';

const profileSettings = () => {
  return (
    <SettingsLayout title="Настройки профиля">
      <Profile />
    </SettingsLayout>
  );
};

export default profileSettings;
