import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import Input from '../Input';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../store/auth/selectors';
import Button from '../../Button';
import Avatar from '../../Avatar';

const Profile = () => {
  const user = useSelector(selectAuth).data;
  const [avatarUrl, setAvatarUrl] = useState<string>(user.avatarUrl);
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const handleChangeImage = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
    }
  };

  useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.addEventListener('change', handleChangeImage);
    }
  }, []);

  return (
    <div>
      <h4 className={styles.header}>
        Изменить профиль
      </h4>
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <Input
            title="Email"
            value={user.email}
          />
          <Input
            title="Username"
            value={user.username}
          />
          <Button color="green">
            Применить
          </Button>
        </div>
        <div>
          <Avatar
            url={avatarUrl}
            type="circle"
            additionalStyles={{ marginBottom: '20px' }}
            alt={`Аватар ${user.username}`}
          />
          <input type="file" ref={inputFileRef} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
