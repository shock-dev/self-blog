import Link from 'next/link';
import styles from './Header.module.scss';
import UserPopup from '../UserPopup';
import Search from '../Search';
import { IUser } from '../../types/user';
import Logo from '../Logo';

interface HeaderProps {
  me?: IUser
}

const Header = ({
  me = null
}: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <Logo />
          <Search />
          {me ? (
            <div className={styles.panel}>
              <Link href="/new">
                <a className={styles.write}>
                  <svg>
                    <use href="/images/[global].svg#write" />
                  </svg>
                </a>
              </Link>
              <UserPopup user={me} />
            </div>
          ) : (
            <div>
              <Link href="/login">
                <a className={styles.loginBtn}>
                  Вход
                </a>
              </Link>
              <Link href="/register">
                <a className={styles.registerBtn}>
                  Регистрация
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
