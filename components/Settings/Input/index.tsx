import { ChangeEvent } from 'react';
import styles from './Input.module.scss';

interface InputProps {
  name: string
  title: string
  value: string
  placeholder?: string
  error: boolean
  message: string
  onChange: (e: ChangeEvent<any>) => void
  onBlur: (e: ChangeEvent<any>) => void
}

const Input = ({
  name,
  title,
  value,
  placeholder = '',
  error,
  message,
  onChange,
  onBlur
}: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        <span className={styles.title}>
          {title}
        </span>
        <input
          className={styles.input}
          name={name}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
      </label>
      {error && (
        <p className={styles.message}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Input;
