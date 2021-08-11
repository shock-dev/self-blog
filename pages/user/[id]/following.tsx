import withAuthSS from '../../../hocs/withAuth';
import UsersApi from '../../../api/users';
import { IUser } from '../../../types/user';
import ProfileLayout from '../../../layouts/ProfileLayout';
import FollowerBox from '../../../components/FollowerBox';

interface FollowingPageProps {
  user: IUser
  following: IUser[]
  me: IUser
}

const FollowingPage = ({
  user,
  following,
  me
}: FollowingPageProps) => {
  const isMe = me?._id === user._id;
  const pageTitle = isMe ? 'Ваши подписки' : `${user.username} (${user.name} ${user.surname}) / Подписки`;

  return (
    <ProfileLayout title={pageTitle} user={user} me={me}>
      <FollowerBox
        title="Подписки"
        list={following}
        user={user}
        me={me}
      />
    </ProfileLayout>
  );
};

export default FollowingPage;

export const getServerSideProps = withAuthSS(async ({ params }) => {
  const { data: user } = await UsersApi.one(params.id);
  const { data: following } = await UsersApi.getFollowing(params.id);
  return {
    props: {
      user,
      following
    }
  };
});

