import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import Input from '../Input';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, selectAuthError, selectIsLoading } from '../../../store/auth/selectors';
import Button from '../../Button';
import Avatar from '../../Avatar';
import Upload from '../../Upload';
import { setError, setUserInfo } from '../../../store/auth/actions';
import { useAlert } from 'react-alert';
import { checkFIleExt } from '../../../utils/checkFIleExt';
import UserApi from '../../../api/users';

interface AvatarProps {
  url: string
  file: File | null
}

const Profile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const user = useSelector(selectAuth).data;
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);
  const [avatarUrl, setAvatarUrl] = useState<AvatarProps>({
    url: user.avatarUrl,
    file: null
  });
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [infoLoading] = useState(false);
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const uploadAvatar = async (file: File): Promise<void> => {
    try {
      const formData = new FormData();

      formData.append('avatar', file);

      const { data } = await UserApi.uploadAvatar(formData);

      dispatch(setUserInfo(data));
      setAvatarLoading(false);
    } catch (e) {
      alert.error('Что-то пошло не так');
    }
  };

  const handleChangeImage = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files[0];

    if (file && checkFIleExt(file)) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl({
        url: imageUrl,
        file
      });
      setAvatarChanged(true);
    } else {
      dispatch(setError('Выберете другой тип файла. Поддерживаются только jpeg, jpg, png'));
    }
  };

  useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.addEventListener('change', handleChangeImage);
    }
  }, []);

  useEffect(() => {
    if (error !== null) {
      alert.error(error);
    }
  }, [error]);

  const uploadAvatarHandler = async () => {
    if (avatarUrl.url !== user.avatarUrl) {
      setAvatarLoading(true);
      await uploadAvatar(avatarUrl.file);
      setAvatarLoading(false);
      setAvatarChanged(false);
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
          <Button
            color="green"
            loading={infoLoading && isLoading}
          >
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
            <Upload onChange={handleChangeImage} uploadRef={inputFileRef} />
            <Button
              onClick={uploadAvatarHandler}
              customStyles={{ marginLeft: '5px' }}
              disabled={!avatarChanged}
              loading={avatarLoading}
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
