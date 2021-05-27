import React from 'react';
import styles from './Profile.module.scss';
import Input from '../Input';
import withAuthSS from '../../../hocs/withAuth';

const Profile = () => {
  return (
    <div>
      <h4 className={styles.header}>
        Изменить профиль
      </h4>
      <div className={styles.wrapper}>
        <div>
          <Input />
        </div>
        <div>
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = withAuthSS();

export default Profile;
