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
          error={true}
          message="Error message"
        />
      </AuthForm>
    </AuthLayout>
  );
}
