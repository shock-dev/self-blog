import { CSSProperties } from 'react';
import Link from 'next/link';
import styles from './PostMini.module.scss';
import { IUser } from '../../types/user';
import Avatar from '../Avatar';
import { getDifference } from '../../utils/reformDate';

interface PostMiniProps {
  id: string
  title: string
  imageUrl?: string
  createdAt: Date
  user: IUser
  customStyles?: CSSProperties
}

const PostMini = ({
  id,
  title,
  createdAt,
  user,
  imageUrl = '',
  customStyles = {}
}: PostMiniProps) => {
  const postUrl = `/post/${id}`;

  return (
    <article className={styles.post} style={customStyles}>
      {!!imageUrl && (
        <img src={imageUrl} className={styles.image} alt="" />
      )}
      <div className={styles.inner}>
        <div className={styles.header}>
          <Avatar
            url={user.avatarUrl}
            width={40}
            height={40}
            additionalStyles={{ marginRight: '10px' }}
            username={user.username}
            type="circle"
          />
          <div className={styles.userWrapper}>
            <Link href={`/user/${user._id}`}>
              <a>
                <span className={styles.fullname}>
                  {user.name} {user.surname}
                </span>
                <span className={styles.username}>
                  @{user.username}
                </span>
              </a>
            </Link>
            <div className={styles.time}>
              {getDifference(createdAt)} назад
            </div>
          </div>
        </div>
        <Link href={postUrl}>
          <a>
            <h2 className={styles.title}>
              {title}
            </h2>
          </a>
        </Link>
        <p>{}</p>
        <ul className={styles.categories}>
          <li className={styles.category}>
            <Link href="/">
              <a className={styles.categoryLink}>
                #Компьютерное железо
              </a>
            </Link>
          </li>
          <li className={styles.category}>
            <Link href="/">
              <a className={styles.categoryLink}>
                #Презентации
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </article>
  );
};

export default PostMini;
