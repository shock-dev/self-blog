import React from 'react';
import AuthLayout from '../layouts/AuthLayout';
import AuthForm from '../components/AuthForm';
import AuthField from '../components/AuthField';
import Button from '../components/Button';
import FormFooter from '../components/FormFooter';

export default function Login() {
  return (
    <AuthLayout>
      <AuthForm title="Login">
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
        <Button>
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
