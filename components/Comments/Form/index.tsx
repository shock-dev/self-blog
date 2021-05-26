import React from 'react';
import styles from './Form.module.scss';
import { useFormik } from 'formik';
import validationSchema from '../../../validation/post/comment';
import { IComment } from '../../../types/comment';

interface CommentFormInputs {
  text: IComment['text']
}

const Form = () => {
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
    onSubmit: (data) => {
      console.log(data);
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
