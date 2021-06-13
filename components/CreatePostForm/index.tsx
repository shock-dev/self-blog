import React, { useState } from 'react';
import styles from './CreatePostForm.module.scss';
import Button from '../Button';
import { useFormik } from 'formik';
import PostsApi from '../../api/posts';
import { useAlert } from 'react-alert';

export interface CreatePostFormInputs {
  title: string
  description: string
}

const CreatePostForm = () => {
  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    handleChange,
    handleBlur
  } = useFormik<CreatePostFormInputs>({
    initialValues: {
      title: '',
      description: ''
    },
    onSubmit: async (formData) => {
      try {
        setLoading(true);
        const { data } = await PostsApi.create(formData);
        console.log(data);
      } catch (e) {
        alert.error('Не удалось опубликовать пост.');
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <form
      className={styles.wrapper}
      onSubmit={handleSubmit}
    >
      <input
        id="title"
        type="text"
        placeholder="Тут введите название поста*"
        className={styles.inputTitle}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <textarea
        id="description"
        placeholder="Контент поста"
        className={styles.textarea}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Button type="submit" loading={loading}>
        Опубликовать
      </Button>
    </form>
  );
};

export default CreatePostForm;
