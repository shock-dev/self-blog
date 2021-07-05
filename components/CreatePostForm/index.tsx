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

export interface CreatePostFormInputs {
  title: string
  description: string
}

const CreatePostForm = () => {
  const { data } = useSelector(selectAuth);
  const alert = useAlert();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
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
    onSubmit: async (formData) => {
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

  const titleError: boolean = touched.title && !!errors.title;
  const descriptionError: boolean = touched.description && !!errors.description;

  return (
    <form
      className={styles.wrapper}
      onSubmit={handleSubmit}
    >
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
    </form>
  );
};

export default CreatePostForm;
