import React from 'react';
import withAuthSS from '../../hocs/withAuth';
import MainLayout from '../../layouts/MainLayout';
import UsersApi from '../../api/users';
import styles from '../../styles/pages/User.module.scss';
import { IUser } from '../../types/user';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';

interface UserPageProps {
  user: IUser
}

const UserPage = ({
  user
}: UserPageProps) => {
  return (
    <MainLayout title={user.username}>
      <div className={styles.wrapper}>
        <div className={styles.user}>
          <Avatar
            url={user.avatarUrl}
            type="circle"
            username={user.username}
          />
          <h4 className={styles.username}>
            {user.username}
          </h4>
          <p className={styles.rank}>
            Admin
          </p>
          <Button
            customStyles={{ marginTop: '20px' }}
            full
          >
            Подписаться
          </Button>
        </div>
        <div className={styles.info}>
          <div className={styles.infoTop}>
            <span className={styles.time}>
              Заходил день назад
            </span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserPage;

export const getServerSideProps = withAuthSS(async ({ params }) => {
  try {
    const { data } = await UsersApi.one(params.id);
    return {
      props: {
        user: data
      }
    };
  } catch (e) {
    return {
      props: {}
    };
  }
});
