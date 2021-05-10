import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
  onClick: () => void
}

export default function Button({
  children,
  type = 'button'
}: ButtonProps) {
  return (
    <button
      type={type}
      className={styles.button}
    >
      {children}
    </button>
  );
}
