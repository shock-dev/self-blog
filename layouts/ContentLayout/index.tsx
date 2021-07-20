import React, { useEffect } from 'react';
import cn from 'classnames';
import Head from 'next/head';
import Header from '../../components/Header';
import styles from './ContentLayout.module.scss';
import Widget from '../../components/Widget';
import Link from 'next/link';
import Button from '../../components/Button';
import LastUsersList from '../../components/LastUsersList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLatestUsers } from '../../store/latestUsers/actions';
import { selectLatestUserError, selectLatestUserItems, selectLatestUserLoading } from '../../store/latestUsers/selectors';

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
  children: React.ReactNode
  auth: boolean
}

export default function ContentLayout({
  title,
  children,
  auth
}: ContentLayoutProps) {
  const dispatch = useDispatch();
  const countOfLatestUsers = 5;
  const latestUsers = useSelector(selectLatestUserItems);
  const loading = useSelector(selectLatestUserLoading);
  const error = useSelector(selectLatestUserError);

  useEffect(() => {
    dispatch(fetchLatestUsers(countOfLatestUsers));
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div className={cn('container', styles.page)}>
        <div className={styles.wrapper}>
          <main className={styles.main}>
            {children}
          </main>
          <aside className={styles.right}>
            <Widget
              title="Первооткрыватели"
              text={`Последние ${countOfLatestUsers} пользователей, которые зарегистрировались`}
            >
              <LastUsersList
                users={latestUsers}
                loading={loading}
                error={error}
              />
            </Widget>
            {auth ? (
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
      </div>
    </>
  );
}
