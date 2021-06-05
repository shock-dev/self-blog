import React from 'react';
import { RegisterFormInputs } from '../../../pages/register';
import styles from './Preview.module.scss';

const Preview = (data: RegisterFormInputs) => {
  // FIXME: Сделать формат даты вида 14 июня 2001 г.

  const { day, month, year } = data.birthday;

  return (
    <div>
      <p className={styles.text}>
        <strong>{data.fullname}</strong>, проверьте, все ли так с вашими данными,
        на данном этапе вы имеете возможность вернуться к предыдущим шагам и поменять данные
      </p>
      <div className={styles.item}>
        <p className={styles.title}>
          Email:
        </p>
        <p className={styles.value}>
          {data.email}
        </p>
      </div>
      <div className={styles.item}>
        <p className={styles.title}>
          Username:
        </p>
        <p className={styles.value}>
          {data.username}
        </p>
      </div>
      <div className={styles.item}>
        <p className={styles.title}>
          Дата рождения:
        </p>
        <p className={styles.value}>
          {new Date(year, month, day).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Preview;
