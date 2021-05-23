import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Post from '../components/Post';
import withAuthSS from '../hocs/withAuth';

interface HomeProps {
  data: any[]
}

const Home = ({ data }: HomeProps) => {
  return (
    <MainLayout title="Home">
      {data.map((post) =>
        <Post
          key={post._id}
          id={post._id}
          title={post.title}
          description={post.description}
        />
      )}
    </MainLayout>
  );
};

export default Home;

export const getServerSideProps = withAuthSS(() => {
  return {
    props: {
      data: []
    }
  };
});
