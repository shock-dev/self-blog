import React from 'react';
import Link from 'next/link';
import styles from './SuggestWriting.module.scss';
import Button from '../Button';

interface LinksProps {
  text: string
  url: string
  isOutline?: boolean
}

interface SuggestWritingProps {
  title: string
  desc: string
  links: LinksProps[]
}

const SuggestWriting = ({
  title,
  desc,
  links
}: SuggestWritingProps) => {
  return (
    <div className={styles.wrapper}>
      <h6 className={styles.title}>
        {title}
      </h6>
      <p className={styles.text}>
        {desc}
      </p>
      {links.map((link, index) =>
        <Link href={link.url} key={index}>
          <a className={styles.link}>
            <Button
              customStyles={{ marginTop: '7px' }}
              full
              outline={link.isOutline}
              withoutHover={link.isOutline}
            >
              {link.text}
            </Button>
          </a>
        </Link>
      )}
    </div>
  );
};

export default SuggestWriting;
