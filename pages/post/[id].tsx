import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import PostsApi from '../../api/posts';
import withAuthSS from '../../hocs/withAuth';

interface PostProps {
  post: any
}

const Post = ({ post }: PostProps) => {
  return (
    <MainLayout title="test">
      {post._id}
      <br />
      {post.title}
    </MainLayout>
  );
};

export const getServerSideProps = withAuthSS(async ({ params }) => {
  const { data } = await PostsApi.getOne(params.id);
  return {
    props: {
      post: data
    }
  };
});

export default Post;
