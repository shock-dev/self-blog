import React from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import AuthForm from '../../components/AuthForm';
import styles from './Login.module.scss';

export default function Login() {
  return (
    <AuthLayout>
      <AuthForm>
        <h2 className={styles.title}>Login</h2>
        <input type="text" />
      </AuthForm>
    </AuthLayout>
  );
}
