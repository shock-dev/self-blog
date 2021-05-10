import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.scss';

interface FooterProps {
  text: string
  to: {
    url: string
    title: string
  }
}

export default function Footer({
  text,
  to: { url, title }
}: FooterProps) {
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
