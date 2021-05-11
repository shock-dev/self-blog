import React from 'react';
import { useFormik } from 'formik';
import validationSchema from '../validation/auth/register';
import MainLayout from '../layouts/MainLayout';
import Form from '../components/Form';
import Field from '../components/Form/Field';
import Button from '../components/Button';
import Footer from '../components/Form/Footer';

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
    <MainLayout
      title="Registration"
      center
    >
      <Form
        title="Register"
        onSubmit={handleSubmit}
      >
        <Field
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
        <Field
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
        <Field
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
        <Footer
          text="do you already have an account?"
          to={{ url: '/login', title: 'Login' }}
        />
      </Form>
    </MainLayout>
  );
}
