import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import Input from '../Input';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, selectAuthError, selectIsLoading } from '../../../store/auth/selectors';
import Button from '../../Button';
import Avatar from '../../Avatar';
import Upload from '../../Upload';
import { setError, setUserInfo, updateUserRequest } from '../../../store/auth/actions';
import { useAlert } from 'react-alert';
import { checkFIleExt } from '../../../utils/checkFIleExt';
import UserApi from '../../../api/users';
import { useFormik } from 'formik';
import { UpdateUserValidation } from '../../../validation/auth/update';
import { compareObjs } from '../../../utils/compareObjs';

interface AvatarProps {
  url: string
  file: File | null
}

export interface UpdateFormInputs {
  email: string
  username: string
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
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const defaultUserData = {
    email: user.email,
    username: user.username
  };
  const {
    handleSubmit,
    handleChange,
    values,
    handleBlur,
    errors,
    touched
  } = useFormik<UpdateFormInputs>({
    initialValues: {
      email: user.email,
      username: user.username
    },
    validationSchema: UpdateUserValidation,
    onSubmit: (data) => {
      if (!compareObjs(defaultUserData, data)) {
        dispatch(updateUserRequest(data));
      }
    }
  });

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

  const uploadAvatarHandler = async () => {
    if (avatarUrl.url !== user.avatarUrl) {
      setAvatarLoading(true);
      await uploadAvatar(avatarUrl.file);
      setAvatarLoading(false);
      setAvatarChanged(false);
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

  return (
    <div>
      <h4 className={styles.header}>
        Изменить профиль
      </h4>
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            name="email"
            title="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && !!errors.email}
            message={errors.email}
          />
          <Input
            name="username"
            title="Username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username && !!errors.username}
            message={errors.username}
          />
          <Button
            type="submit"
            color="green"
            loading={isLoading}
            disabled={compareObjs(defaultUserData, values) || !!Object.keys(errors).length}
          >
            Применить
          </Button>
        </form>
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
