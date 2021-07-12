import React from 'react';
import Link from 'next/link';
import s from './DiscusWidget.module.scss';

const DiscusWidget = () => {
  return (
    <div className={s.wrapper}>
      <h6 className={s.title}>
        Обсуждения <span>В разработке*</span>
      </h6>
      <ul className={s.list}>
        <li className={s.item}>
          <Link href="/">
            <a className={s.link}>
              Какое то обсуждение
            </a>
          </Link>
        </li>
        <li className={s.item}>
          <Link href="/">
            <a className={s.link} title="Какое то длинное и важное обсуждение">
              Какое то длинное и важное обсуждение
            </a>
          </Link>
        </li>
        <li className={s.item}>
          <Link href="/">
            <a className={s.link} title="Какое то длинное и важное обсуждение">
              Какое то длинное и важное обсуждение
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DiscusWidget;
