import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Post from '../components/Post';
import { IPost } from '../store/posts/types';
import Cookies from 'nookies';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import axios from 'axios';

interface HomeProps {
  data: IPost[]
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

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = Cookies.get(ctx);

    await axios.get('http://localhost:5000/api/users/me', {
      headers: {
        cookie: `authToken=${cookies.authToken}`
      }
    });

    return {
      props: {
        data: []
      }
    };
  } catch (e) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
};

export default Home;
