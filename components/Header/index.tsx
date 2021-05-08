import React from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__inner}>
          <Link href="/">
            <a>
              <img src="/images/logo.png" alt="Logo" />
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}
