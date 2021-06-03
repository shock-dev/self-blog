import React, { useContext } from 'react';
import { useFormik } from 'formik';
import Field from '../Form/Field';
import Button from '../Button';
import Form from '../Form';
import { PasswordStepValidation } from '../../validation/auth/register';
import { PasswordStepFormInputs, RegisterContext } from '../../pages/register';

const PasswordStep = () => {
  const { onBackStep, userData, setUserData } = useContext(RegisterContext);
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur
  } = useFormik<PasswordStepFormInputs>({
    initialValues: {
      password: userData.password,
      passwordConfirm: userData.passwordConfirm
    },
    validationSchema: PasswordStepValidation,
    onSubmit: () => {
      console.log('test');
    }
  });

  const handleBack = () => {
    setUserData({
      ...userData,
      ...values
    });
    onBackStep();
  };

  return (
    <Form
      title="Регистрация"
      onSubmit={handleSubmit}
    >
      <Field
        title="Пароль"
        type="password"
        placeholder="Введите password"
        icon="lock"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password && !!errors.password}
        message={errors.password}
      />
      <Field
        title="Подтверждение пароля"
        type="password"
        placeholder="Подтвердите ваш пароль"
        icon="confirm"
        name="passwordConfirm"
        value={values.passwordConfirm}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.passwordConfirm && !!errors.passwordConfirm}
        message={errors.passwordConfirm}
      />
      <Button
        color="green"
        type="submit"
        around
        full
      >
        Зарегестрироваться
      </Button>
      <Button
        color="blue"
        customStyles={{ marginTop: '10px' }}
        around
        outline
        full
        onClick={handleBack}
      >
        Назад
      </Button>
    </Form>
  );
};

export default PasswordStep;
