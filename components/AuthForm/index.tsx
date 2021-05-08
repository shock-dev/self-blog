import React from 'react';
import styles from './AuthForm.module.scss';

interface AuthFormProps {
  children: React.ReactNode
}

export default function AuthForm({ children }: AuthFormProps) {
  return (
    <div className={styles.form}>
      {children}
    </div>
  );
}
