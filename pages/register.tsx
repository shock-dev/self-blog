import React from 'react';
import Head from 'next/head';
import AuthLayout from '../layouts/AuthLayout';
import AuthForm from '../components/AuthForm';
import AuthField from '../components/AuthField';
import Button from '../components/Button';
import FormFooter from '../components/FormFooter';

export default function Login() {
  return (
    <AuthLayout>
      <Head>
        <title>Registration</title>
      </Head>
      <AuthForm title="Register">
        <AuthField
          title="Email"
          placeholder="Type your email address"
          error={false}
          message="Error message"
          icon="email"
        />
        <AuthField
          title="Username"
          placeholder="Type your username"
          error={false}
          message="Error message"
          icon="user"
        />
        <AuthField
          title="Password"
          type="password"
          placeholder="Type your password"
          error={false}
          message="Error message"
          icon="lock"
        />
        <AuthField
          title="Password"
          type="password"
          placeholder="Type your password"
          error={false}
          message="Error message"
          icon="confirm"
        />
        <Button>
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
