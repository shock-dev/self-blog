import React from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../../store/auth/actions';
import { selectIsAuth } from '../../store/auth/selectors';

export default function Header() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const logoutHandler = () => {
    dispatch(logoutRequest());
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
