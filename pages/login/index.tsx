import React from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import AuthForm from '../../components/AuthForm';
import AuthField from '../../components/AuthField';

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
      </AuthForm>
    </AuthLayout>
  );
}
