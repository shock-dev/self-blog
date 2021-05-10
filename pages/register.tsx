import React from 'react';
import Head from 'next/head';
import { useFormik } from 'formik';
import validationSchema from '../validation/auth/register';
import AuthLayout from '../layouts/AuthLayout';
import AuthForm from '../components/AuthForm';
import AuthField from '../components/AuthField';
import Button from '../components/Button';
import FormFooter from '../components/FormFooter';

interface FormInputs {
  email: string
  username: string
  password: string
  confirmPassword: string
}

export default function Register() {
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur
  } = useFormik<FormInputs>({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: (data) => {
      console.log(data);
    }
  });

  return (
    <AuthLayout>
      <Head>
        <title>Registration</title>
      </Head>
      <AuthForm
        title="Register"
        onSubmit={handleSubmit}
      >
        <AuthField
          title="Email"
          placeholder="Type your email address"
          icon="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && !!errors.email}
          message={errors.email}
        />
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
        <AuthField
          title="Confirm password"
          type="password"
          placeholder="Repeat your password"
          icon="confirm"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmPassword && !!errors.confirmPassword}
          message={errors.confirmPassword}
        />
        <Button type="submit">
          Sign up
        </Button>
        <FormFooter
          text="do you already have an account?"
          to={{ url: '/login', title: 'Login' }}
        />
      </AuthForm>
    </AuthLayout>
  );
}
