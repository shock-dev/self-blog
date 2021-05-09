import React from 'react';
import cn from 'classnames';
import styles from './AuthField.module.scss';

interface AuthFieldProps {
  title: string
  placeholder: string
  type?: string
  error: boolean
  message: string
}

export default function AuthField({
  title,
  placeholder,
  type = 'text',
  error,
  message
}: AuthFieldProps) {
  return (
    <div className={cn(styles.field, { error })}>
      <label>
        <p className={styles.field__title}>
          {title}
        </p>
        <input
          className={styles.field__input}
          type={type}
          placeholder={placeholder}
        />
      </label>
      {error && (
        <p className={styles.field__error}>
          {message}
        </p>
      )}
    </div>
  );
}
