import React from 'react';
import styles from './Form.module.scss';
import { useFormik } from 'formik';
import validationSchema from '../../../validation/post/comment';
import { IComment } from '../../../types/comment';
import { useDispatch } from 'react-redux';
import { requestAddComment } from '../../../store/comments/actions';
import { IPost } from '../../../types/post';
import Button from '../../Button';

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
    onSubmit: (data, { resetForm }) => {
      const payload: IAddComment = {
        text: data.text,
        postId
      };
      dispatch(requestAddComment(payload));
      resetForm();
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
          >
            Отправить
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Form;
