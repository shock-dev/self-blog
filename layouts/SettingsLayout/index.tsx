import { ReactNode } from 'react';
import cn from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import styles from './SettingsLayout.module.scss';
import { IUser } from '../../types/user';

interface SettingsLayoutProps {
  title: string
  children: ReactNode
  me: IUser
}

const SettingsLayout = ({
  title,
  children,
  me
}: SettingsLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header me={me} />
      <div className={cn('container', styles.page)}>
        <div className={styles.wrapper}>
          <aside className={styles.aside}>
            <div className={styles.asideTop}>
              Настройки аккаунта
            </div>
            <ul>
              <li>
                <Link href="/settings/profile">
                  <a className={styles.asideLink}>
                    Профиль
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/settings/account">
                  <a className={styles.asideLink}>
                    Аккаунт
                  </a>
                </Link>
              </li>
            </ul>
          </aside>
          <main className={styles.main}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default SettingsLayout;
