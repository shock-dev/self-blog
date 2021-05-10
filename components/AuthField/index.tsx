import React, { ChangeEvent } from 'react';
import cn from 'classnames';
import styles from './AuthField.module.scss';

interface AuthFieldProps {
  title: string
  placeholder: string
  type?: string
  error: boolean
  message: string
  icon: string
  value: string
  name: string
  onChange: (e: ChangeEvent<any>) => void
  onBlur: (e: ChangeEvent<any>) => void
}

export default function AuthField({
  title,
  placeholder,
  type = 'text',
  error,
  message,
  icon,
  value,
  name,
  onChange,
  onBlur
}: AuthFieldProps) {
  return (
    <div className={styles.wrapper}>
      <label>
        <p className={styles.title}>
          {title}
        </p>
        <div className={styles.input_wrapper}>
          <svg className={cn(styles.svg, { [styles.svg_error]: error })}>
            <use href={`images/[form].svg#${icon}`} />
          </svg>
          <input
            className={cn(styles.input, { [styles.input_error]: error })}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            onBlur={onBlur}
          />
        </div>
      </label>
      {error && (
        <p className={styles.message}>
          {message}
        </p>
      )}
    </div>
  );
}
