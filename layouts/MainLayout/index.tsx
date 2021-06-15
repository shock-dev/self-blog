import React from 'react';
import cn from 'classnames';
import Head from 'next/head';
import Header from '../../components/Header';
import styles from './MainLayout.module.scss';
import DiscusWidget from '../../components/DiscusWidget';

interface MainLayoutProps {
  title: string
  children: React.ReactNode
}

export default function MainLayout({
  title,
  children
}: MainLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div className={cn('container', styles.page)}>
        <div className={styles.wrapper}>
          <main className={styles.main}>
            {children}
          </main>
          <aside className={styles.aside}>
            <DiscusWidget />
          </aside>
        </div>
      </div>
    </>
  );
}
