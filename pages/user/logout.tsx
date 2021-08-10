import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../styles/pages/Logout.module.scss';
import withAuthSS from '../../hocs/withAuth';
import { destroyCookie } from 'nookies';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      destroyCookie(null, 'authToken');
      await router.replace('/');
    })();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Подождите, мы выходим..</title>
      </Head>
      <div className={styles.blog}>
        <h4 className={styles.title}>
          Подождите, мы выходим..
        </h4>
        <div className={styles.ldsRing}>
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = withAuthSS();

export default Logout;
