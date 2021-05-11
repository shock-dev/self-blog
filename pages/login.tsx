import React from 'react';
import { useFormik } from 'formik';
import validationSchema from '../validation/auth/login';
import MainLayout from '../layouts/MainLayout';
import Form from '../components/Form';
import Field from '../components/Form/Field';
import Button from '../components/Button';
import Footer from '../components/Form/Footer';

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
    <MainLayout title="Login">
      <Form
        title="Login"
        onSubmit={handleSubmit}
      >
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
        <Button type="submit">
          Login
        </Button>
        <Footer
          text="Or sing up using"
          to={{ url: '/register', title: 'Sign up' }}
        />
      </Form>
    </MainLayout>
  );
}
