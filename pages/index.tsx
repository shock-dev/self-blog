import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Post from '../components/Post';
import withAuthSS from '../hocs/withAuth';
import styles from '../styles/pages/index.module.scss';

const Home = () => {
  return (
    <MainLayout title="Home">
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <Post />
        </main>
        <aside className={styles.aside}>
          test
        </aside>
      </div>
    </MainLayout>
  );
};

export default Home;

export const getServerSideProps = withAuthSS();
