import React, { MutableRefObject, useRef, useState } from 'react';
import Link from 'next/link';
import useOutsideClick from '../../hooks/useOutsideClick';
import { logoutRequest } from '../../store/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './UserPopup.module.scss';
import { selectAuth } from '../../store/auth/selectors';

const UserPopup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userId = useSelector(selectAuth).data._id;
  const [visible, setVisible] = useState(false);
  const avatarUrl = useSelector(selectAuth).data.avatarUrl;
  const ref = useRef() as MutableRefObject<HTMLUListElement>;

  const toggleVisible = (): void => {
    setVisible(!visible);
  };

  const logoutHandler = async () => {
    try {
      await dispatch(logoutRequest());
      await router.replace('/login');
    } catch (e) {
      alert(e.message);
    }
  };

  useOutsideClick(ref, () => {
    if (visible) {
      setVisible(false);
    }
  });

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.avatar}
        style={{ backgroundImage: `url(${avatarUrl})` }}
        type="button"
        onClick={toggleVisible}
      />
      {visible && (
        <ul
          className={styles.popup}
          ref={ref}
        >
          <li>
            <Link href={`/user/${userId}`}>
              <a className={styles.link}>Profile</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className={styles.link}>Settings</a>
            </Link>
          </li>
          <li>
            <button
              className={styles.link}
              onClick={logoutHandler}
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserPopup;
