import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/pages/Logout.module.scss';
import withAuthSS from '../../hocs/withAuth';
import { logoutRequest } from '../../store/auth/actions';
import { selectIsAuth } from '../../store/auth/selectors';

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(logoutRequest());
  }, []);

  useEffect(() => {
    router.replace('/login');
  }, [isAuth]);

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
