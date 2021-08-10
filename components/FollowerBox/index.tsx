import React from 'react';
import Link from 'next/link';
import { IUser } from '../../types/user';
import styles from './FollowerBox.module.scss';
import Follower from '../Follower';

interface FollowerBoxProps {
  title: string
  list: IUser[]
  user: IUser
  me: IUser
}

const FollowerBox = ({
  title,
  list,
  user,
  me
}: FollowerBoxProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          {title}
        </h3>
        <Link href={`/user/${user._id}`}>
          <a className={styles.goBack}>
            Вернутся в профиль
          </a>
        </Link>
      </div>
      <div className={styles.list}>
        {list.map((user) =>
          <Follower
            key={user._id}
            id={user._id}
            username={user.username}
            name={user.name}
            surname={user.surname}
            avatarUrl={user.avatarUrl}
            isMe={me?._id === user._id}
            isFollow={me?.following.includes(user._id)}
            customStyles={{ margin: '10px 10px' }}
            hideBtn={!!me}
          />
        )}
      </div>
    </div>
  );
};

export default FollowerBox;
