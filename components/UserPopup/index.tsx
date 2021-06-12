import React, { MutableRefObject, useRef, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import useOutsideClick from '../../hooks/useOutsideClick';
import styles from './UserPopup.module.scss';
import { selectAuth } from '../../store/auth/selectors';
import Avatar from '../Avatar';
import cn from 'classnames';

const UserPopup = () => {
  const user = useSelector(selectAuth).data;
  const [visible, setVisible] = useState(false);
  const ref = useRef() as MutableRefObject<HTMLUListElement>;

  const toggleVisible = (): void => {
    setVisible(!visible);
  };

  useOutsideClick(ref, () => {
    if (visible) {
      setVisible(false);
    }
  });

  return (
    <div className={styles.wrapper}>
      <button
        onClick={toggleVisible}
        className={styles.btn}
      >
        <p className={styles.name}>
          {user.name}
        </p>
        <Avatar
          url={user.avatarUrl}
          width={40}
          height={40}
          username={user.username}
          type="circle"
        />
        <img
          src="/images/arrow-down.svg"
          alt="arrow"
          className={styles.arrow}
        />
      </button>
      <ul
        className={cn(styles.popup, { [styles.show]: visible })}
        ref={ref}
      >
        <li>
          <Link href={`/user/${user._id}`}>
            <a className={styles.link}>
              <svg className={styles.svg}>
                <use href={'/images/[popup].svg#user'} />
              </svg>
              Профиль
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/settings/profile`}>
            <a className={styles.link}>
              <svg className={styles.svg}>
                <use href={'/images/[popup].svg#settings'} />
              </svg>
              Настройки
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/user/logout`}>
            <a className={styles.link}>
              <svg className={styles.svg}>
                <use href={'/images/[popup].svg#logout'} />
              </svg>
              Выйти
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserPopup;
