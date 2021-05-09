import React, { useState } from 'react';
import cn from 'classnames';
import styles from './AuthField.module.scss';

interface AuthFieldProps {
  title: string
  placeholder: string
  type?: string
  error: boolean
  message: string
  icon: string
}

export default function AuthField({
  title,
  placeholder,
  type = 'text',
  error,
  message,
  icon
}: AuthFieldProps) {
  const [inputType, setInputType] = useState(type);

  const onEyeHandler = () => {
    const nextType = type === inputType ? 'text' : 'password';
    setInputType(nextType);
  };

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
            type={inputType}
            placeholder={placeholder}
          />
          {type === 'password' && (
            <button
              className={styles.eye_btn}
              onClick={onEyeHandler}
            >
              <svg className={styles.eye_svg}>
                <use href="images/[form].svg#eye" />
              </svg>
            </button>
          )}
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
