import React from 'react';
import { IUser } from '../../types/user';
import styles from './FollowerBox.module.scss';
import Follower from '../Follower';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../store/auth/selectors';

interface FollowerBoxProps {
  title: string
  list: IUser[]
}

const FollowerBox = ({
  title,
  list
}: FollowerBoxProps) => {
  const me = useSelector(selectAuth).data;

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        {title}
      </h3>
      <div className={styles.list}>
        {list.map((user) =>
          <Follower
            key={user._id}
            id={user._id}
            username={user.username}
            name={user.name}
            surname={user.surname}
            avatarUrl={user.avatarUrl}
            isMe={me._id === user._id}
            isFollow={me.following.includes(user._id)}
            customStyles={{ margin: '10px 10px' }}
          />
        )}
      </div>
    </div>
  );
};

export default FollowerBox;
