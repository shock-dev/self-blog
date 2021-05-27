import React from 'react';
import styles from './Input.module.scss';

const Input = () => {
  return (
    <label className={styles.label}>
      <span className={styles.title}>
        Имя
      </span>
      <input
        className={styles.input}
        type="text"
      />
    </label>
  );
};

export default Input;
