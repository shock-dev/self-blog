import React, { ChangeEvent, useRef, useState } from 'react';
import Link from 'next/link';
import SearchApi from '../../api/search';
import { IUser } from '../../types/user';
import s from './index.module.scss';
import Avatar from '../Avatar';
import Spinner from '../Spinner';
import { use } from 'ast-types';
import { IPost } from '../../types/post';
import useOutsideClick from '../../hooks/useOutsideClick';
import useDebounce from '../../hooks/useDebounce';

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const debouncedSearch = useDebounce(searchHandler, 500);
  const ref = useRef();

  async function searchHandler(q) {
    setLoading(true);
    const { posts, users } = await SearchApi.getUsersAndPosts(q);
    setUsers(users);
    setPosts(posts);
    setLoading(false);
  }

  useOutsideClick(ref, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    if (value.length > 0) {
      setIsOpen(true);
      debouncedSearch(value);
    } else {
      setIsOpen(false);
      setLoading(false);
      setUsers([]);
      setPosts([]);
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
          onChange={onChange}
        />
      </label>
      {isOpen && (
        <div className={s.result} ref={ref}>
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
