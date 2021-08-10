import React from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import UserPopup from '../UserPopup';
import Search from '../Search';
import { IUser } from '../../types/user';

interface HeaderProps {
  me: IUser
}

const Header = ({
  me
}: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <Link href="/">
            <a>
              <img src="/images/logo.svg" alt="Logo" />
            </a>
          </Link>
          <Search />
          {me ? (
            <div className={styles.panel}>
              <Link href="/new">
                <a className={styles.write}>
                  <svg>
                    <use href="/images/[global].svg#write" />
                  </svg>
                </a>
              </Link>
              <UserPopup user={me} />
            </div>
          ) : (
            <div>
              <Link href="/login">
                <a className={styles.loginBtn}>
                  Вход
                </a>
              </Link>
              <Link href="/register">
                <a className={styles.registerBtn}>
                  Регистрация
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
