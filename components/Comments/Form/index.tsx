import React from 'react';
import styles from './Form.module.scss';
import { useFormik } from 'formik';
import validationSchema from '../../../validation/post/comment';
import { IComment } from '../../../types/comment';
import { useDispatch } from 'react-redux';
import { requestAddComment } from '../../../store/comments/actions';
import { IPost } from '../../../types/post';

interface FormProps {
  postId: IPost['_id']
}

interface CommentFormInputs {
  text: IComment['text']
}

export interface IAddComment extends FormProps, CommentFormInputs {}

const Form = ({ postId }: FormProps) => {
  const dispatch = useDispatch();
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
    onSubmit: async (data) => {
      const payload: IAddComment = {
        text: data.text,
        postId
      };
      await dispatch(requestAddComment(payload));
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
          <button
            className={styles.sendBtn}
            type="submit"
          >
            Отправить
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
