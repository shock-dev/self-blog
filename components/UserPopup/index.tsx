import React, { MutableRefObject, useRef, useState } from 'react';
import Link from 'next/link';
import useOutsideClick from '../../hooks/useOutsideClick';
import { useSelector } from 'react-redux';
import styles from './UserPopup.module.scss';
import { selectAuth } from '../../store/auth/selectors';
import Avatar from '../Avatar';

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
        style={{ border: 'none' }}
      >
        <Avatar
          url={user.avatarUrl}
          width={40}
          height={40}
          alt={`Avatar of ${user.username}`}
        />
      </button>
      {visible && (
        <ul
          className={styles.popup}
          ref={ref}
        >
          <li>
            <Link href={`/user/${user._id}`}>
              <a className={styles.link}>
                <svg className={styles.svg}>
                  <use href={'/images/[popup].svg#user'} />
                </svg>
                Profile
              </a>
            </Link>
          </li>
          <li>
            <Link href={`/settings/profile`}>
              <a className={styles.link}>
                <svg className={styles.svg}>
                  <use href={'/images/[popup].svg#settings'} />
                </svg>
                Settings
              </a>
            </Link>
          </li>
          <li>
            <Link href={`/user/logout`}>
              <a className={styles.link}>
                <svg className={styles.svg}>
                  <use href={'/images/[popup].svg#logout'} />
                </svg>
                Logout
              </a>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserPopup;
