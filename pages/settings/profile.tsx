import SettingsLayout from '../../layouts/SettingsLayout';
import Profile from '../../components/Settings/Profile';
import withAuthSS from '../../hocs/withAuth';
import { IUser } from '../../types/user';

interface ProfileSettingsProps {
  me: IUser
}

const ProfileSettings = ({
  me
}: ProfileSettingsProps) => {
  return (
    <SettingsLayout title="Настройки профиля" me={me}>
      <Profile me={me} />
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

export default ProfileSettings;
