import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
  title: string
  value: string
  placeholder?: string
}

const Input = ({
  title,
  value,
  placeholder = ''
}: InputProps) => {
  return (
    <label className={styles.label}>
      <span className={styles.title}>
        {title}
      </span>
      <input
        className={styles.input}
        type="text"
        value={value}
        placeholder={placeholder}
      />
    </label>
  );
};

export default Input;
