import React, { useEffect } from 'react';
import styles from './Profile.module.scss';
import Input from '../Input';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../../../store/auth/selectors';
import Button from '../../Button';
import axios from '../../../core/axios';
import { setUserInfo } from '../../../store/auth/actions';

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('avatar', file);

  const { data } = await axios.post('/users/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return data;
};

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuth).data;
  const [avatarUrl, setAvatarUrl] = React.useState<string>(user.avatarUrl);
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const handleChangeImage = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files[0];

    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setAvatarUrl(imgUrl);

      const { data } = await uploadFile(file);
      dispatch(setUserInfo(data));
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
          <Button>
            Применить
          </Button>
        </div>
        <div>
          <div className={styles.circle}>
            <img className={styles.avatar} src={avatarUrl} alt="" />
          </div>
          <input type="file" ref={inputFileRef} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
