import Link from 'next/link';
import s from './index.module.scss';
import Avatar from '../Avatar';
import { IUser } from '../../types/user';

interface LastUsersListProps {
  users: IUser[]
}

const LastUsersList = ({
  users
}: LastUsersListProps) => {
  return (
    <div className={s.wrapper}>
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
              </a>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
;

export default LastUsersList;
