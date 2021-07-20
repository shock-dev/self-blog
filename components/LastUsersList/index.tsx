import React from 'react';
import Link from 'next/link';
import s from './index.module.scss';
import Avatar from '../Avatar';
import { IUser } from '../../types/user';
import { getDifference } from '../../utils/reformDate';
import Spinner from '../Spinner';

interface LastUsersListProps {
  users: IUser[]
  loading: boolean
  error: null | string
}

const LastUsersList = ({
  users,
  loading,
  error
}: LastUsersListProps) => {
  return (
    <div className={s.wrapper}>
      {loading ? (
        <Spinner />
      ) : (
        error ? (
          <div />
        ) : (
          <ul>
            {users.map((user) =>
              <li key={user._id}>
                <Link href={`/user/${user._id}`}>
                  <a className={s.item} title={`${user.name} ${user.surname}`}>
                    <Avatar
                      username={user.username}
                      url={user.avatarUrl}
                      width={30}
                      height={30}
                      type="circle"
                      additionalStyles={{ marginRight: '10px' }}
                    />
                    <p className={s.name}>{user.name} {user.surname}</p>
                    <time className={s.time}>
                      {getDifference(user.createdAt)}
                    </time>
                  </a>
                </Link>
              </li>
            )}
          </ul>
        )
      )}
    </div>
  );
}
;

export default LastUsersList;
