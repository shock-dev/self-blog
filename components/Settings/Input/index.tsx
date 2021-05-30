import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
  title: string
  value: string
}

const Input = ({
  title,
  value
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
      />
    </label>
  );
};

export default Input;
