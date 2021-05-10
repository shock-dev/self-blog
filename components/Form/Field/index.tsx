import React, { ChangeEvent } from 'react';
import cn from 'classnames';
import styles from './Field.module.scss';

interface FieldProps {
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

export default function Field({
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
}: FieldProps) {
  return (
    <div className={styles.wrapper}>
      <label>
        <p className={styles.title}>
          {title}
        </p>
        <div className={styles.input_wrapper}>
          <input
            className={cn(styles.input, { [styles.input_error]: error })}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            onBlur={onBlur}
          />
          <svg className={cn(styles.svg, { [styles.svg_error]: error })}>
            <use href={`images/[form].svg#${icon}`} />
          </svg>
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
