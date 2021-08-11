import withAuthSS from '../../../hocs/withAuth';
import UsersApi from '../../../api/users';
import { IUser } from '../../../types/user';
import ProfileLayout from '../../../layouts/ProfileLayout';
import FollowerBox from '../../../components/FollowerBox';

interface FollowersPageProps {
  user: IUser
  followers: IUser[]
  me: IUser
}

const FollowersPage = ({
  user,
  followers,
  me
}: FollowersPageProps) => {
  const isMe = me?._id === user._id;
  const pageTitle = isMe ? 'Ваши подписчики' : `${user.username} (${user.name} ${user.surname}) / Подписчики`;

  return (
    <ProfileLayout title={pageTitle} user={user} me={me}>
      <FollowerBox
        title="Подписчики"
        list={followers}
        user={user}
        me={me}
      />
    </ProfileLayout>
  );
};

export default FollowersPage;

export const getServerSideProps = withAuthSS(async ({ params }) => {
  const { data: user } = await UsersApi.one(params.id);
  const { data: followers } = await UsersApi.getFollowers(params.id);
  return {
    props: {
      user,
      followers
    }
  };
});

