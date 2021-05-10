import React from 'react';
import Head from 'next/head';
import { useFormik } from 'formik';
import validationSchema from '../validation/auth/login';
import AuthLayout from '../layouts/AuthLayout';
import AuthForm from '../components/AuthForm';
import AuthField from '../components/AuthField';
import Button from '../components/Button';
import FormFooter from '../components/FormFooter';

interface FormInputs {
  username: string
  password: string
}

export default function Login() {
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur
  } = useFormik<FormInputs>({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema,
    onSubmit: (data) => {
      console.log(data);
    }
  });

  return (
    <AuthLayout>
      <Head>
        <title>Login</title>
      </Head>
      <AuthForm
        title="Login"
        onSubmit={handleSubmit}
      >
        <AuthField
          title="Username"
          placeholder="Type your username"
          icon="user"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.username && !!errors.username}
          message={errors.username}
        />
        <AuthField
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
        <Button type="submit" onClick={handleSubmit}>
          Login
        </Button>
        <FormFooter
          text="Or sing up using"
          to={{ url: '/register', title: 'Sign up' }}
        />
      </AuthForm>
    </AuthLayout>
  );
}
