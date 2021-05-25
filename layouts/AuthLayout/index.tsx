import React from 'react';
import cn from 'classnames';
import Head from 'next/head';
import Header from '../../components/Header';
import styles from './AuthLayout.module.scss';

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
      <div className={cn('container', styles.center)}>
        {children}
      </div>
    </>
  );
}
