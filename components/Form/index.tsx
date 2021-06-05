import React, { FormEvent } from 'react';
import styles from './Form.module.scss';

interface FormProps {
  title: string
  onSubmit: (e: FormEvent<HTMLFormElement>) => any
  children: React.ReactNode
}

export default function Form({
  title,
  onSubmit,
  children
}: FormProps) {
  return (
    <form
      onSubmit={(e) => onSubmit(e)}
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
