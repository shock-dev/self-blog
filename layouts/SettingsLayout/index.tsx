import React from 'react';
import cn from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import styles from './SettingsLayout.module.scss';

interface SettingsLayoutProps {
  title: string
  children: React.ReactNode
}

export default function SettingsLayout({
  title,
  children
}: SettingsLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div className={cn('container', styles.page)}>
        <div className={styles.wrapper}>
          <aside className={styles.aside}>
            <div className={styles.asideTop}>
              Настройки аккаунта
            </div>
            <ul>
              <li>
                <Link href="/settings/profile">
                  <a className={styles.asideLink}>
                    Профиль
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/settings/account">
                  <a className={styles.asideLink}>
                    Аккаунт
                  </a>
                </Link>
              </li>
            </ul>
          </aside>
          <main className={styles.main}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
