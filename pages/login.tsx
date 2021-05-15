import React from 'react';
import { useFormik } from 'formik';
import validationSchema from '../validation/auth/login';
import MainLayout from '../layouts/MainLayout';
import Form from '../components/Form';
import Field from '../components/Form/Field';
import Button from '../components/Button';
import Footer from '../components/Form/Footer';
import { useDispatch } from 'react-redux';
import { login } from '../store/auth/actions';

export interface LoginFormInputs {
  email: string
  password: string
}

export default function Login() {
  const dispatch = useDispatch();
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
    onSubmit: (data) => {
      dispatch(login(data));
    }
  });

  return (
    <MainLayout
      title="Login"
      center
    >
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
