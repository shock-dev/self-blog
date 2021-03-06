import { ReactNode } from 'react';
import Head from 'next/head';
import styles from './ContentLayout.module.scss';
import Widget from '../../components/Widget';
import Link from 'next/link';
import Button from '../../components/Button';
import LastUsersList from '../../components/LastUsersList';
import { IUser } from '../../types/user';
import Wrapper from '../Wrapper';

const authLinks = [
  {
    url: '/login',
    text: 'Войти',
    isOutline: false
  },
  {
    url: '/register',
    text: 'Зарегистрироваться',
    isOutline: true
  }
];

const writeLinks = [
  {
    url: '/new',
    text: 'Создать пост',
    isOutline: false
  },
  {
    url: '/new',
    text: 'Обсудить что-либо',
    isOutline: true
  }
];

interface ContentLayoutProps {
  title: string
  children: ReactNode
  lastUsers: IUser[]
  me: IUser
}

const ContentLayout = ({
  title,
  children,
  lastUsers,
  me
}: ContentLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Wrapper me={me}>
        <div className={styles.wrapper}>
          <main className={styles.main}>
            {children}
          </main>
          <aside className={styles.right}>
            <Widget
              title="Первооткрыватели"
              text={`Последние 5 пользователей, которые зарегистрировались`}
            >
              <LastUsersList users={lastUsers} />
            </Widget>
            {me ? (
              <Widget
                title="Пишите"
                text="Вы можете поделиться опытом, создавая пост или запустить тему для обсуждения"
              >
                {writeLinks.map((link, index) =>
                  <Link href={link.url} key={index}>
                    <a
                      className={styles.link}
                      style={{ marginTop: index === authLinks.length - 1 ? '7px' : '0' }}
                    >
                      <Button
                        full
                        outline={link.isOutline}
                        withoutHover={link.isOutline}
                      >
                        {link.text}
                      </Button>
                    </a>
                  </Link>
                )}
              </Widget>
            ) : (
              <Widget
                title="Авторизуйтесь"
                text="Для большинства действий на сайте вам необходимо войти в систему"
              >
                {authLinks.map((link, index) =>
                  <Link href={link.url} key={index}>
                    <a
                      className={styles.link}
                      style={{ marginTop: index === authLinks.length - 1 ? '7px' : '0' }}
                    >
                      <Button
                        full
                        outline={link.isOutline}
                        withoutHover={link.isOutline}
                      >
                        {link.text}
                      </Button>
                    </a>
                  </Link>
                )}
              </Widget>
            )}
          </aside>
        </div>
      </Wrapper>
    </>
  );
};

export default ContentLayout;
