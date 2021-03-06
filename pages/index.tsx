import ContentLayout from '../layouts/ContentLayout';
import withAuthSS from '../hocs/withAuth';
import PostsApi from '../api/posts';
import UsersApi from '../api/users';
import PostMini from '../components/PostMini';
import { IPost } from '../types/post';
import { IUser } from '../types/user';

interface HomeProps {
  posts: IPost[]
  lastUsers: IUser[]
  me: IUser
}

const Home = ({
  posts,
  me,
  lastUsers
}: HomeProps) => {
  return (
    <ContentLayout
      title="Главная"
      me={me}
      lastUsers={lastUsers}
    >
      {posts.map((post) =>
        <PostMini
          key={post._id}
          id={post._id}
          title={post.title}
          imageUrl={post?.imageUrl}
          createdAt={post.createdAt}
          user={post.user}
          customStyles={{ margin: '0 0 20px' }}
        />
      )}
    </ContentLayout>
  );
};

export default Home;

export const getServerSideProps = withAuthSS(async () => {
  const { data: posts } = await PostsApi.getAll();
  const { data: lastUsers } = await UsersApi.getLatest();

  return {
    props: {
      posts,
      lastUsers
    }
  };
});
