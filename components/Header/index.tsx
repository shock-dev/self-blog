import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../store/auth/selectors';
import styles from './Header.module.scss';
import UserPopup from '../UserPopup';

export default function Header() {
  const isAuth = useSelector(selectIsAuth);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <Link href="/">
            <a>
              <img src="/images/logo.svg" alt="Logo" />
            </a>
          </Link>
          {isAuth ? (
            <div className={styles.panel}>
              <Link href="/new">
                <a className={styles.write}>
                  <svg>
                    <use href="/images/[global].svg#write" />
                  </svg>
                </a>
              </Link>
              <UserPopup />
            </div>
          ) : (
            <div>
              <Link href="/login">
                <a className={styles.loginBtn}>
                  Login
                </a>
              </Link>
              <Link href="/register">
                <a className={styles.registerBtn}>
                  Register
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
