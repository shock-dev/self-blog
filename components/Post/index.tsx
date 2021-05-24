import React from 'react';
import Link from 'next/link';
import styles from './Post.module.scss';

export default function Post() {
  return (
    <article className={styles.post}>
      <div className={styles.header}>
        <img className={styles.avatar} src="https://res.cloudinary.com/demo/image/upload/w_40,h_40,c_fill/sample.jpg" alt="" />
        <div className={styles.userWrapper}>
          <Link href="/">
            <a className={styles.username}>shock-dev</a>
          </Link>
          <div className={styles.time}>
            Вчера в 15:40
          </div>
        </div>
      </div>
      <Link href="/">
        <a>
          <h2 className={styles.title}>
            Как получить GATT характеристики для моего устройства?
          </h2>
        </a>
      </Link>
      <ul className={styles.categories}>
        <li className={styles.category}>
          <Link href="/">
            <a className={styles.categoryLink}>
              Компьютерное железо
            </a>
          </Link>
        </li>
        <li className={styles.category}>
          <Link href="/">
            <a className={styles.categoryLink}>
              Презентации
            </a>
          </Link>
        </li>
      </ul>
      <img className={styles.img} src="https://wantsee.world/wp-content/uploads/2019/06/New-York-City-USA.jpg" />
      <p className={styles.text}>
        {/* eslint-disable-next-line max-len */}
        Консоль привлекает многих своей минималистичностью и эстетикой, но даже в ней иногда хочется выделить определённый фрагмент, чтобы показать его роль или значимость. Например, отметить зелёным текстом сообщение об успешном выполнении операции или обозначить длинный текст ошибки курсивом. О том, как это делать, а также о реализации на питоне
      </p>
      <div className={styles.footer}>
        <button className={styles.btn}>
          Читать далее
        </button>
        <ul className={styles.panel}>
          <li className={styles.panelItem}>
            <svg className={styles.panelIcon} width="26px" height="18px">
              <use href={`images/[post].svg#views`} />
            </svg>
            15
          </li>
          <li className={styles.panelItem}>
            <Link href="/">
              <a className={styles.panelItem}>
                <svg className={styles.panelIcon} width="26px" height="18px">
                  <use href={`images/[post].svg#comments`} />
                </svg>
                3
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </article>
  );
}
