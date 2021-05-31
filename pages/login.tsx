import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import validationSchema from '../validation/auth/login';
import AuthLayout from '../layouts/AuthLayout';
import Form from '../components/Form';
import Field from '../components/Form/Field';
import Button from '../components/Button';
import Footer from '../components/Form/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '../store/auth/actions';
import withNotAuthSS from '../hocs/withNotAuth';
import { useRouter } from 'next/router';
import { selectAuthError, selectIsAuth } from '../store/auth/selectors';
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
  }, [error]);

  useEffect(() => {
    if (isAuth) {
      router.replace('/');
    }
  }, [isAuth]);

  return (
    <AuthLayout title="Login">
      <Form
        title="Login"
        onSubmit={handleSubmit}
      >
        <Field
          title="Email"
          placeholder="Type your email"
          icon="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && !!errors.email}
          message={errors.email}
        />
        <Field
          title="Password"
          type="password"
          placeholder="Type your password"
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
          around
          full
        >
          Login
        </Button>
        <Footer
          text="Or sing up using"
          to={{ url: '/register', title: 'Sign up' }}
        />
      </Form>
    </AuthLayout>
  );
}

export const getServerSideProps = withNotAuthSS();
