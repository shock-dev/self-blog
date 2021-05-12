import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import PostsApi from '../../api/posts';
import { IPost } from '../../store/posts/types';

interface PostProps {
  data: IPost
}

export default function Post({ data }: PostProps) {
  return (
    <MainLayout title="test">
      {data._id}
      <br/>
      {data.title}
    </MainLayout>
  );
}

export async function getServerSideProps({ params }) {
  const { data } = await PostsApi.getOne(params.id);
  return {
    props: { data }
  };
}
