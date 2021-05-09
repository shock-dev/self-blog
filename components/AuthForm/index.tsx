import React from 'react';
import styles from './AuthForm.module.scss';

interface AuthFormProps {
  title: string
  children: React.ReactNode
}

export default function AuthForm({ title, children }: AuthFormProps) {
  return (
    <div className={styles.form}>
      <h2 className={styles.title}>
        {title}
      </h2>
      <div>
        {children}
      </div>
    </div>
  );
}
