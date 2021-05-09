import React from 'react';
import Link from 'next/link';
import styles from './FormFooter.module.scss';

interface FormFooterProps {
  text: string
  to: {
    url: string
    title: string
  }
}

export default function FormFooter({
  text,
  to: { url, title }
}: FormFooterProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>
        {text}
      </p>
      <Link href={url}>
        <a className={styles.link}>{title}</a>
      </Link>
    </div>
  );
}
