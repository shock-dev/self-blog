import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import validationSchema from '../validation/auth/register';
import AuthLayout from '../layouts/AuthLayout';
import Form from '../components/Form';
import Field from '../components/Form/Field';
import Button from '../components/Button';
import Footer from '../components/Form/Footer';
import withNotAuthSS from '../hocs/withNotAuth';
import { useDispatch, useSelector } from 'react-redux';
import { clearFields, registerRequest } from '../store/auth/actions';
import { selectAuthError, selectIsAuth, selectIsLoading } from '../store/auth/selectors';
import { useAlert } from 'react-alert';
import { useRouter } from 'next/router';

export interface RegisterFormInputs {
  email: string
  username: string
  password: string
  passwordConfirm: string
}

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  const alert = useAlert();
  const isAuth = useSelector(selectIsAuth);
  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectIsLoading);
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur
  } = useFormik<RegisterFormInputs>({
    initialValues: {
      email: '',
      username: '',
      password: '',
      passwordConfirm: ''
    },
    validationSchema,
    onSubmit: async (data) => {
      dispatch(registerRequest(data));
    }
  });

  useEffect(() => {
    if (error !== null) {
      alert.error(error);
    }

    return () => {
      if (!isAuth) {
        dispatch(clearFields());
      }
    };
  }, [error]);

  useEffect(() => {
    if (isAuth) {
      router.replace('/');
    }
  }, [isAuth]);

  return (
    <AuthLayout title="Регистрация">
      <Form
        title="Регистрация"
        onSubmit={handleSubmit}
      >
        <Field
          title="Email"
          placeholder="Введите email адрес"
          icon="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && !!errors.email}
          message={errors.email}
        />
        <Field
          title="Username"
          placeholder="Введите username"
          icon="user"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.username && !!errors.username}
          message={errors.username}
        />
        <Field
          title="Пароль"
          type="password"
          placeholder="Введите password"
          icon="lock"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && !!errors.password}
          message={errors.password}
        />
        <Field
          title="Подтверждение пароля"
          type="password"
          placeholder="Подтвердите ваш пароль"
          icon="confirm"
          name="passwordConfirm"
          value={values.passwordConfirm}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.passwordConfirm && !!errors.passwordConfirm}
          message={errors.passwordConfirm}
        />
        <Button
          type="submit"
          color="green"
          loading={isLoading}
          around
          full
        >
          Зарегестрироваться
        </Button>
        <Footer
          text="Уже зарегестрированы?"
          to={{ url: '/login', title: 'Войти' }}
        />
      </Form>
    </AuthLayout>
  );
}

export const getServerSideProps = withNotAuthSS();
