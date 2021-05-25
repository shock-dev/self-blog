import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import PostsApi from '../../api/posts';
import withAuthSS from '../../hocs/withAuth';
import Post from '../../components/Post';

interface PostProps {
  post: any
}

const PostPage = ({ post }: PostProps) => {
  return (
    <MainLayout title={post.title}>
      <Post
        key={post._id}
        id={post._id}
        title={post.title}
        description={post.description}
        imageUrl={post.imageUrl}
        views={post.views}
        author={post.user}
      />
    </MainLayout>
  );
};

export const getServerSideProps = withAuthSS(async ({ params }) => {
  try {
    const { data } = await PostsApi.getOne(params.id);
    return {
      props: {
        post: data
      }
    };
  } catch (e) {
    return {
      props: {
        post: {}
      }
    };
  }
});

export default PostPage;
