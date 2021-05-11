import React from 'react';
import cn from 'classnames';
import Head from 'next/head';
import Header from '../../components/Header';
import styles from './MainLayout.module.scss';

interface MainLayoutProps {
  title: string
  center?: boolean
  children: React.ReactNode
}

export default function MainLayout({
  title,
  center = false,
  children
}: MainLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div className={cn('container', { [styles.center]: center, [styles.page]: !center })}>
        {children}
      </div>
    </>
  );
}
