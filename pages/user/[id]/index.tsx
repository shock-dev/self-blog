import withAuthSS from '../../../hocs/withAuth';
import UsersApi from '../../../api/users';
import PostsApi from '../../../api/posts';
import { IUser } from '../../../types/user';
import UserInfo from '../../../components/UserInfo';
import ProfileLayout from '../../../layouts/ProfileLayout';
import { IPost } from '../../../types/post';
import PostMini from '../../../components/PostMini';

interface UserPageProps {
  user: IUser
  me: IUser
  posts: IPost[]
}

const UserPage = ({
  user,
  posts,
  me
}: UserPageProps) => {
  const isMe = me?._id === user?._id;
  const pageTitle = isMe ? 'Ваш профиль' : `${user.username} (${user.name} ${user.surname})`;

  return (
    <ProfileLayout title={pageTitle} user={user} me={me}>
      <UserInfo
        email={user.email}
        bio={user.bio}
        birthday={new Date(user.birthday).toLocaleDateString()}
        postCount={posts.length}
        gender={user.gender}
        registerDate={new Date(user.createdAt).toLocaleDateString()}
      />
      {posts.map((post) =>
        <PostMini
          key={post._id}
          id={post._id}
          title={post.title}
          createdAt={post.createdAt}
          user={user}
          customStyles={{ margin: '0 0 20px' }}
        />
      )}
    </ProfileLayout>
  );
};

export default UserPage;

export const getServerSideProps = withAuthSS(async ({ params }) => {
  const { data: user } = await UsersApi.one(params.id);
  const { data: posts } = await PostsApi.getByUserId(params.id);
  return {
    props: {
      user,
      posts
    }
  };
});
