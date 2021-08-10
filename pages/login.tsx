import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { useAlert } from 'react-alert';
import AuthApi from '../api/auth';
import validationSchema from '../validation/auth/login';
import AuthLayout from '../layouts/AuthLayout';
import Form from '../components/Form';
import Button from '../components/Button';
import protectFromAuthorizedUsers from '../hocs/protectFromAuthorizedUsers';

export interface LoginFormInputs {
  email: string
  password: string
}

const Login = () => {
  const alert = useAlert();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    onSubmit: async (formData) => {
      try {
        setLoading(true);
        const { data } = await AuthApi.login(formData);
        setCookie(null, 'authToken', data);
        await router.replace('/');
      } catch (e) {
        const { data } = e.response.data;
        if (!data) {
          alert.error('Что-то пошло не так, попробуйте снова');
        } else {
          alert.error(data);
        }
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <AuthLayout title="Вход">
      <Form
        title="🚪 Вход"
        onSubmit={handleSubmit}
      >
        <Form.Field
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
        <Form.Field
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
          loading={loading}
          around
          full
        >
          Войти
        </Button>
        <Form.Footer
          text="Или вы можете зарегистрироваться"
          to={{ url: '/register', title: 'Регистрация' }}
        />
      </Form>
    </AuthLayout>
  );
};

export const getServerSideProps = protectFromAuthorizedUsers();

export default Login;
