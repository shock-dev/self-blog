import React, { useState } from 'react';
import styles from './Form.module.scss';
import { useFormik } from 'formik';
import CommentsApi from '../../../api/comments';
import validationSchema from '../../../validation/post/comment';
import { IComment } from '../../../types/comment';
import { IPost } from '../../../types/post';
import Button from '../../Button';

interface FormProps {
  postId: IPost['_id']
  onAdd: (comment: IComment) => void
}

interface CommentFormInputs {
  text: IComment['text']
}

const Form = ({
  postId,
  onAdd
}: FormProps) => {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur
  } = useFormik<CommentFormInputs>({
    initialValues: {
      text: ''
    },
    validationSchema,
    onSubmit: async ({ text }, { resetForm }) => {
      setLoading(true);
      const payload = { text, postId };
      const { data } = await CommentsApi.create(payload);
      onAdd(data);
      resetForm();
      setLoading(false);
    }
  });

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <h4 className={styles.title}>
        Написать комментарий
      </h4>
      <div className={styles.wrapper}>
        <div className={styles.body}>
          <textarea
            className={styles.textarea}
            value={values.text}
            onChange={handleChange}
            onBlur={handleBlur}
            name="text"
          />
        </div>
        {touched.text && !!errors.text && (
          <p className={styles.error}>
            {errors.text}
          </p>
        )}
        <div className={styles.footer}>
          <Button
            type="submit"
            color="blue"
            disabled={!values.text.length}
            customStyles={{ marginTop: '10px' }}
            loading={loading}
          >
            Отправить
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Form;
