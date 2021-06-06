import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import validationSchema from '../validation/auth/login';
import AuthLayout from '../layouts/AuthLayout';
import Form from '../components/Form';
import Field from '../components/Form/Field';
import Button from '../components/Button';
import Footer from '../components/Form/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { clearFields, fetchLogin } from '../store/auth/actions';
import withNotAuthSS from '../hocs/withNotAuth';
import { useRouter } from 'next/router';
import { selectAuthError, selectIsAuth, selectIsLoading } from '../store/auth/selectors';
import { useAlert } from 'react-alert';

export interface LoginFormInputs {
  email: string
  password: string
}

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuth = useSelector(selectIsAuth);
  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectIsLoading);
  const alert = useAlert();
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur
  } = useFormik<LoginFormInputs>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (data) => {
      await dispatch(fetchLogin(data));
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
    <AuthLayout title="Вход">
      <Form
        title="🚪 Вход"
        onSubmit={handleSubmit}
      >
        <Field
          title="Email"
          placeholder="Введите email"
          icon="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && !!errors.email}
          message={errors.email}
        />
        <Field
          title="Пароль"
          type="password"
          placeholder="Введите пароль"
          icon="lock"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && !!errors.password}
          message={errors.password}
        />
        <Button
          type="submit"
          color="green"
          loading={isLoading}
          around
          full
        >
          Войти
        </Button>
        <Footer
          text="Или вы можете зарегистрироваться"
          to={{ url: '/register', title: 'Регистрация' }}
        />
      </Form>
    </AuthLayout>
  );
}

export const getServerSideProps = withNotAuthSS();
