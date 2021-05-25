import React from 'react';
import Link from 'next/link';
import styles from './Item.module.scss';

const Item = () => {
  return (
    <div className={styles.comment}>
      <div className={styles.header}>
        <Link href="/">
          <a className={styles.user}>
            <img
              className={styles.avatar}
              src="https://res.cloudinary.com/demo/image/upload/w_20,h_20,c_fill/sample.jpg"
              alt=""
            />
            <div className={styles.username}>
              shock_dev
            </div>
          </a>
        </Link>
        <div className={styles.time}>
          Вчера в 15:40
        </div>
      </div>
      <p className={styles.text}>
        Some text
      </p>
    </div>
  );
};

export default Item;
