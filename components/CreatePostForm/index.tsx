import React, { useState } from 'react';
import styles from './CreatePostForm.module.scss';
import Button from '../Button';
import { useFormik } from 'formik';
import PostsApi from '../../api/posts';
import { useAlert } from 'react-alert';
import createPostValidationSchema from '../../validation/post/create';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { IPost } from '../../types/post';
import Reminder from '../Reminder';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../store/auth/selectors';
import MarkdownOutput from '../MarkdownOutput';
import Upload from '../Upload';
import { checkFIleExt } from '../../utils/checkFIleExt';

export interface CreatePostFormInputs {
  title: string
  description: string
  intro?: File
}

interface PostImageProps {
  url: null | string
  file: File | null
}

const CreatePostForm = () => {
  const { data } = useSelector(selectAuth);
  const alert = useAlert();
  const router = useRouter();
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [postImageUrl, setPostImageUrl] = useState<PostImageProps>({
    url: null,
    file: null
  });
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    values
  } = useFormik<CreatePostFormInputs>({
    initialValues: {
      title: '',
      description: ''
    },
    validationSchema: createPostValidationSchema,
    onSubmit: async (data) => {
      const formData = new FormData();

      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('intro', postImageUrl.file);

      try {
        setLoading(true);
        const { data }: { data: IPost } = await PostsApi.create(formData);
        await router.push(`/post/${data._id}`);
      } catch (e) {
        alert.error('Не удалось опубликовать пост.');
      } finally {
        setLoading(false);
      }
    }
  });

  const handleChangeImage = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files[0];

    if (file && checkFIleExt(file)) {
      const imageUrl = URL.createObjectURL(file);
      setPostImageUrl({
        url: imageUrl,
        file
      });
    }
  };

  const titleError: boolean = touched.title && !!errors.title;
  const descriptionError: boolean = touched.description && !!errors.description;

  return (
    <form
      className={styles.wrapper}
      onSubmit={handleSubmit}
    >
      {!!postImageUrl.url && (
        <img
          src={postImageUrl.url}
          className={styles.postImage}
          alt=""
        />
      )}
      {!data && (
        <Reminder text="написать пост" styles={{ margin: '0 0 20px' }} />
      )}
      {isPreview ? (
        <MarkdownOutput
          title={values.title}
          description={values.description}
        />
      ) : (
        <>
          <div className={styles.inputWrapper}>
            <input
              id="title"
              type="text"
              placeholder="Тут введите название поста*"
              className={cn(styles.inputTitle, { [styles.inputError]: titleError })}
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {titleError && (
              <p className={styles.errorMessage}>
                {errors.title}
              </p>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <textarea
              id="description"
              placeholder="Контент поста"
              className={cn(styles.textarea, { [styles.inputError]: descriptionError })}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {descriptionError && (
              <p className={styles.errorMessage}>
                {errors.description}
              </p>
            )}
          </div>
        </>
      )}
      <div className={styles.footer}>
        <div style={{ display: 'flex' }}>
          <Button type="submit" loading={loading}>
            Опубликовать
          </Button>
          {isPreview ? (
            <Button
              type="button"
              customStyles={{ margin: '0 0 0 10px' }}
              onClick={() => setIsPreview(false)}
              outline
            >
              Вернуться
            </Button>
          ) : (
            <Button
              type="button"
              customStyles={{ margin: '0 0 0 10px' }}
              onClick={() => setIsPreview(true)}
              outline
            >
              Предпросмотр
            </Button>
          )}
        </div>
        <div style={{ display: 'flex' }}>
          <div className={styles.downloadImageText}>
            Загрузить картинку
          </div>
          <Upload
            onChange={handleChangeImage}
            uploadRef={inputFileRef}
          />
        </div>
      </div>
    </form>
  );
};

export default CreatePostForm;
