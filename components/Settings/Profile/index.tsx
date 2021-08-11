import { useEffect, useRef, useState } from 'react';
import styles from './Profile.module.scss';
import Input from '../Input';
import Button from '../../Button';
import Avatar from '../../Avatar';
import Upload from '../../Upload';
import { useAlert } from 'react-alert';
import { checkFIleExt } from '../../../utils/checkFIleExt';
import { useFormik } from 'formik';
import { UpdateUserValidation } from '../../../validation/auth/update';
import { compareObjs } from '../../../utils/compareObjs';
import { IUser } from '../../../types/user';
import UsersApi from '../../../api/users';

interface AvatarProps {
  url: string;
  file: File | null;
}

export interface UpdateFormInputs {
  email: string;
  username: string;
  bio: string;
}

interface ProfileProps {
  me: IUser;
}

const Profile = ({
  me
}: ProfileProps) => {
  const alert = useAlert();
  const [user, setUser] = useState(me);
  const [avatarUrl, setAvatarUrl] = useState<AvatarProps>({
    url: user.avatarUrl,
    file: null
  });
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [infoLoading, setInfoLoading] = useState(false);
  const inputFileRef = useRef(null);
  const defaultUserData = {
    email: user.email,
    username: user.username,
    bio: user.bio
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
      username: user.username,
      bio: user.bio
    },
    validationSchema: UpdateUserValidation,
    onSubmit: async (formData) => {
      if (!compareObjs(defaultUserData, formData)) {
        try {
          setInfoLoading(true);
          const { data } = await UsersApi.update(formData);
          setUser(data);
        } catch (e) {
          alert.error('Что-то пошло не так. Попробуйте снова');
        } finally {
          setInfoLoading(false);
        }
      }
    }
  });

  const uploadAvatar = async (file: File): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const { data } = await UsersApi.uploadAvatar(formData);
      setUser(data);
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
      alert.error('Выберете другой тип файла. Поддерживаются только jpeg, jpg, png');
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
          <Input
            name="bio"
            title="Bio"
            value={values.bio}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.bio && !!errors.bio}
            message={errors.bio}
          />
          <Button
            type="submit"
            color="green"
            loading={infoLoading}
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
