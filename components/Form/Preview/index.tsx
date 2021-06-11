import React from 'react';
import { RegisterFormInputs } from '../../../pages/register';
import styles from './Preview.module.scss';

const Preview = (data: RegisterFormInputs) => {
  const { day, month, year } = data.birthday;
  const output = [
    {
      title: 'Email',
      value: data.email
    },
    {
      title: 'Username',
      value: data.username
    },
    {
      title: 'Полное имя',
      value: `${data.name} ${data.surname}`
    },
    {
      title: 'Дата рождения',
      value: new Date(year, month, day).toLocaleDateString()
    },
    {
      title: 'Пол',
      value: data.gender.label
    }
  ];

  return (
    <div>
      <p className={styles.text}>
        <strong>{data.name}</strong>, проверьте, все ли так с вашими данными,
        на данном этапе вы имеете возможность вернуться к предыдущим шагам и поменять данные
      </p>
      {output.map((item, index) =>
        <div className={styles.item} key={index}>
          <p className={styles.title}>
            {item.title}:
          </p>
          <p className={styles.value}>
            {item.value}
          </p>
        </div>
      )}
    </div>
  );
};

export default Preview;
