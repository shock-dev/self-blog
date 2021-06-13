import React from 'react';
import Link from 'next/link';
import styles from './SuggestWriting.module.scss';
import Button from '../Button';

const SuggestWriting = () => {
  return (
    <div className={styles.wrapper}>
      <h6 className={styles.title}>
        Пишите
      </h6>
      <p className={styles.text}>Вы можете поделиться опытом, создавая пост или запустить тему для обсуждения</p>
      <Link href="/new">
        <a className={styles.link}>
          <Button
            customStyles={{ marginTop: '14px' }}
            full
          >
            Создать пост
          </Button>
        </a>
      </Link>
      <Link href="/new">
        <a className={styles.link}>
          <Button
            customStyles={{ marginTop: '7px' }}
            outline
            full
          >
            Обсудить что-либо
          </Button>
        </a>
      </Link>
    </div>
  );
};

export default SuggestWriting;
