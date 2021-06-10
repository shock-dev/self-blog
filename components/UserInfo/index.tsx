import React from 'react';
import styles from './UserInfo.module.scss';

interface UserInfoProps {
  fullname: string
  bio?: string
  email: string
  birthday: string
  postCount: number
  registerDate: string
}

const UserInfo = ({
  fullname,
  bio,
  email,
  birthday,
  postCount,
  registerDate
}: UserInfoProps) => {
  return (
    <div className={styles.info}>
      <div className={styles.header}>
        <div className={styles.top}>
          <h4 className={styles.fullname}>
            {fullname}
          </h4>
          <span className={styles.time}>
            Заходил день назад
          </span>
        </div>
        {bio && (
          <p className={styles.desc}>
            {bio}
          </p>
        )}
      </div>
      <div className={styles.section}>
        <div className={styles.row}>
          <div className={styles.col}>
            Email:
          </div>
          <div className={styles.col}>
            <a href={`mailto:${email}`}>
              {email}
            </a>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            Дата рождения:
          </div>
          <div className={styles.col}>
            {birthday}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            Пол:
          </div>
          <div className={styles.col}>
            муж.
          </div>
        </div>
      </div>
      <div className={styles.sectionTitle}>
        <span>
          Статистика
        </span>
        <span className={styles.line} />
      </div>
      <div className={styles.section}>
        <div className={styles.row}>
          <div className={styles.col}>
            Дата регистрации:
          </div>
          <div className={styles.col}>
            {registerDate}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            Написано постов:
          </div>
          <div className={styles.col}>
            {postCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
