import Link from 'next/link';
import styles from './PostFull.module.scss';
import { IUser } from '../../types/user';
import Avatar from '../Avatar';
import { getDifference } from '../../utils/reformDate';
import MarkdownOutput from '../MarkdownOutput';

interface PostFullProps {
  title: string
  description: string
  imageUrl?: string
  createdAt: Date
  user: IUser
}

const PostFull = ({
  title,
  description,
  imageUrl = null,
  createdAt,
  user
}: PostFullProps) => {
  return (
    <article className={styles.post}>
      <div className={styles.header}>
        <Avatar
          url={user.avatarUrl}
          width={40}
          height={40}
          additionalStyles={{ marginRight: '10px' }}
          username={user.username}
        />
        <div className={styles.userWrapper}>
          <Link href={`/user/${user._id}`}>
            <a className={styles.username}>{user.username}</a>
          </Link>
          <div className={styles.time}>
            {getDifference(createdAt)} назад
          </div>
        </div>
      </div>
      <h2 className={styles.title}>
        {title}
      </h2>
      <ul className={styles.categories}>
        <li className={styles.category}>
          <Link href="/">
            <a className={styles.categoryLink}>
              Компьютерное железо
            </a>
          </Link>
        </li>
        <li className={styles.category}>
          <Link href="/">
            <a className={styles.categoryLink}>
              Презентации
            </a>
          </Link>
        </li>
      </ul>
      {imageUrl && (
        <img className={styles.img} src={imageUrl} alt={title} />
      )}
      <p className={styles.text}>
        <MarkdownOutput text={description} />
      </p>
    </article>
  );
};

export default PostFull;
