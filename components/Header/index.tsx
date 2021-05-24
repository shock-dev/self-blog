import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../store/auth/selectors';
import { logoutRequest } from '../../store/auth/actions';
import styles from './Header.module.scss';

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuth = useSelector(selectIsAuth);

  const logoutHandler = async () => {
    try {
      await dispatch(logoutRequest());
      await router.push('/login');
    } catch (e) {
      alert(e.message);
    }
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
