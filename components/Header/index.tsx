import React from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../store/auth/selectors';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuth = useSelector(selectIsAuth);

  const logoutHandler = async () => {
    dispatch({
      type: 'logout'
    });
    Cookies.remove('authToken');
    await router.replace('/login');
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <Link href="/">
            <a>
              <img src="/images/logo.png" alt="Logo" />
            </a>
          </Link>
          {isAuth ? (
            <button onClick={logoutHandler}>
              Выйти
            </button>
          ) : (
            <div>
              <Link href="/login">
                <a>Login</a>
              </Link>
              <Link href="/register">
                <a>Register</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
