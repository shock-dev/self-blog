import React from 'react';
import ContentLayout from '../layouts/ContentLayout';
import withAuthSS from '../hocs/withAuth';
import PostsApi from '../api/posts';
import PostMini from '../components/PostMini';
import { IPost } from '../types/post';

interface HomeProps {
  posts: IPost[]
}

const Home = ({
  posts
}: HomeProps) => {
  return (
    <ContentLayout title="Главная">
      {posts.map((post) =>
        <PostMini
          key={post._id}
          id={post._id}
          title={post.title}
          description={post.description}
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
  try {
    const { data } = await PostsApi.getAll();

    return {
      props: { posts: data }
    };
  } catch (e) {
    return {
      props: { posts: [] }
    };
  }
});
