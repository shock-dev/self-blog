import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Post from '../components/Post';
import withAuthSS from '../hocs/withAuth';
import PostsApi from '../api/posts';
import styles from '../styles/pages/index.module.scss';

interface HomeProps {
  posts: any[]
}

const Home = ({
  posts
}: HomeProps) => {
  return (
    <MainLayout title="Home">
      <div className={styles.wrapper}>
        <main className={styles.main}>
          {posts.map((post) =>
            <Post
              key={post._id}
              id={post._id}
              title={post.title}
              description={post.description}
              imageUrl={post.imageUrl}
              views={post.views}
              author={post.user}
            />
          )}
        </main>
        <aside className={styles.aside}>
          test
        </aside>
      </div>
    </MainLayout>
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
