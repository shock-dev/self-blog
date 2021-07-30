import React, { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import SearchApi from '../../api/search';
import { IUser } from '../../types/user';
import s from './index.module.scss';
import Avatar from '../Avatar';
import Spinner from '../Spinner';
import { use } from 'ast-types';
import { IPost } from '../../types/post';

const Search = () => {
  // todo: нужен debounce и заменить на redux
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const searchHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value.length > 0) {
      setIsOpen(true);
      setLoading(true);
      const { posts, users } = await SearchApi.getUsersAndPosts(e.target.value);
      setUsers(users);
      setPosts(posts);
      setLoading(false);
    }
  };

  return (
    <div className={s.wrapper}>
      <label className={s.label}>
        <svg className={s.svg}>
          <use href="/images/[global].svg#search" />
        </svg>
        <input
          className={s.input}
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={(e) => searchHandler(e)}
        />
      </label>
      {isOpen && (
        <div className={s.result}>
          {loading ? (
            <Spinner styles={{ margin: '0 auto' }} />
          ) : (
            <>
              <p className={s.title}>
                <span>Люди</span>
              </p>
              <ul>
                {users.length ? (
                  users.map((user: IUser, index) =>
                    <li key={index}>
                      <Link href={`/user/${user._id}`}>
                        <a className={s.user}>
                          <Avatar
                            url={user.avatarUrl}
                            username={user.username}
                            width={32}
                            height={32}
                            type="circle"
                            additionalStyles={{ marginRight: '10px' }}
                          />
                          <div>
                            <p className={s.name}>{user.name} {user.surname}</p>
                            <p className={s.username}>@{user.username}</p>
                          </div>
                        </a>
                      </Link>
                    </li>
                  )
                ) : (
                  <p>
                    Пользователи не найдены
                  </p>
                )}
              </ul>
              <p className={s.title}>
                <span>Посты</span>
              </p>
              <ul>
                {posts.length ? (
                  posts.map((post: IPost, index) =>
                    <li key={index}>
                      <Link href={`/post/${post._id}`}>
                        <a className={s.post}>
                          {post.title}
                        </a>
                      </Link>
                    </li>
                  )
                ) : (
                  <p>
                    Посты не найдены
                  </p>
                )}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
