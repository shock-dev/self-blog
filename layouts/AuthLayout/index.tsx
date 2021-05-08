import React from 'react';
import cn from 'classnames';
import Header from '../../components/Header';
import styles from './AuthLayout.module.scss';

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <Header />
      <div className={cn('container', styles.center)}>
        {children}
      </div>
    </>
  );
}
