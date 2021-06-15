import React from 'react';
import cn from 'classnames';
import Head from 'next/head';
import Header from '../../components/Header';
import styles from './ContentLayout.module.scss';
import SuggestWriting from '../../components/SuggestWriting';
import DiscusWidget from '../../components/DiscusWidget';

interface ContentLayoutProps {
  title: string
  children: React.ReactNode
}

export default function ContentLayout({
  title,
  children
}: ContentLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div className={cn('container', styles.page)}>
        <div className={styles.wrapper}>
          <aside className={styles.left}>
            <SuggestWriting />
          </aside>
          <main className={styles.main}>
            {children}
          </main>
          <aside className={styles.right}>
            <DiscusWidget />
          </aside>
        </div>
      </div>
    </>
  );
}
