import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import Input from '../Input';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../../../store/auth/selectors';
import Button from '../../Button';
import Avatar from '../../Avatar';
import Upload from '../../Upload';
import { addAvatarRequest } from '../../../store/auth/actions';

interface AvatarProps {
  url: string
  file: File | null
}

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuth).data;
  const [avatarUrl, setAvatarUrl] = useState<AvatarProps>({
    url: user.avatarUrl,
    file: null
  });
  const [avatarChanged, setAvatarChanged] = useState(false);
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const handleChangeImage = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl({
        url: imageUrl,
        file
      });
      setAvatarChanged(true);
    }
  };

  useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.addEventListener('change', handleChangeImage);
    }
  }, []);

  const uploadAvatarHandler = async () => {
    if (avatarUrl.url !== user.avatarUrl) {
      dispatch(addAvatarRequest(avatarUrl.file));
    }
  };

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
          <Input
            title="Полное имя"
            value={user?.fullname ?? ''}
            placeholder="Имя Фамилия"
          />
          <Button color="green">
            Применить
          </Button>
        </div>
        <div>
          <Avatar
            url={avatarUrl.url}
            type="circle"
            additionalStyles={{ marginBottom: '20px' }}
            username={user.username}
          />
          <div style={{ display: 'flex' }}>
            <Upload onChange={handleChangeImage} ref={inputFileRef} />
            <Button
              onClick={uploadAvatarHandler}
              customStyles={{ marginLeft: '5px' }}
              disabled={!avatarChanged}
              full
            >
              Загрузить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
