import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Post from '../components/Post';
import PostsApi from '../api/posts';
import { IPost } from '../store/posts/types';

interface HomeProps {
  data: IPost[]
}

export default function Home({ data }: HomeProps) {
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
}

export async function getStaticProps() {
  const { data } = await PostsApi.getAll();

  return {
    props: { data }
  };
}
