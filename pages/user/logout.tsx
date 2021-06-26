import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import styles from '../../styles/pages/Logout.module.scss';
import withAuthSS from '../../hocs/withAuth';
import { logoutRequest } from '../../store/auth/actions';
import { useRouter } from 'next/router';

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(logoutRequest(router));
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
