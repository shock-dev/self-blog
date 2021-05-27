import React from 'react';
import ContentLayout from '../layouts/ContentLayout';
import Post from '../components/Post';
import withAuthSS from '../hocs/withAuth';
import PostsApi from '../api/posts';

interface HomeProps {
  posts: any[]
}

const Home = ({
  posts
}: HomeProps) => {
  return (
    <ContentLayout title="Home">
      {posts.map((post) =>
        <Post
          key={post._id}
          id={post._id}
          title={post.title}
          description={post.description}
          imageUrl={post.imageUrl}
          views={post.views}
          withFooter={true}
          isShortText={true}
          commentsCount={post.comments.length}
          user={post.user}
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
