import React from 'react';
import cn from 'classnames';
import Head from 'next/head';
import Header from '../../components/Header';
import styles from './ContentLayout.module.scss';
import SuggestWriting from '../../components/SuggestWriting';
import DiscusWidget from '../../components/DiscusWidget';

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
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div className={cn('container', styles.page)}>
        <div className={styles.wrapper}>
          <aside className={styles.left}>
            {auth ? (
              <SuggestWriting
                title="Пишите"
                desc="Вы можете поделиться опытом, создавая пост или запустить тему для обсуждения"
                links={[
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
                ]}
              />
            ) : (
              <SuggestWriting
                title="Авторизуйтесь"
                desc="Для больших действий на сайте вам необходимо войти в систему"
                links={[
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
                ]}
              />
            )}
          </aside>
          <main className={styles.main}>
            {children}
          </main>
          <aside className={styles.right}>
            <DiscusWidget />
          </aside>
        </div>
      </div>
    </>
  );
}
