import React from 'react';
import styles from './AuthForm.module.scss';

interface AuthFormProps {
  title: string
  onSubmit: () => any
  children: React.ReactNode
}

export default function AuthForm({
  title,
  onSubmit,
  children
}: AuthFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={styles.form}
    >
      <h2 className={styles.title}>
        {title}
      </h2>
      <div>
        {children}
      </div>
    </form>
  );
}
