import React from 'react';
import { useFormik } from 'formik';
import validationSchema from '../validation/auth/register';
import AuthLayout from '../layouts/AuthLayout';
import Form from '../components/Form';
import Field from '../components/Form/Field';
import Button from '../components/Button';
import Footer from '../components/Form/Footer';
import withNotAuthSS from '../hocs/withNotAuth';

interface FormInputs {
  email: string
  username: string
  password: string
  passwordConfirm: string
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
      passwordConfirm: ''
    },
    validationSchema,
    onSubmit: (data) => {
      console.log(data);
    }
  });

  return (
    <AuthLayout title="Registration">
      <Form
        title="Регистрация"
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
          value={values.passwordConfirm}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.passwordConfirm && !!errors.passwordConfirm}
          message={errors.passwordConfirm}
        />
        <Button
          type="submit"
          color="green"
          around
          full
        >
          Sign up
        </Button>
        <Footer
          text="do you already have an account?"
          to={{ url: '/login', title: 'Login' }}
        />
      </Form>
    </AuthLayout>
  );
}

export const getServerSideProps = withNotAuthSS();
