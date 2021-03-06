import { useContext } from 'react';
import Button from '../Button';
import Form from '../Form';
import { useFormik } from 'formik';
import { InfoStepValidation } from '../../validation/auth/register';
import { InfoStepFormInputs, RegisterContext } from '../../pages/register';

const infoStep = () => {
  const { onNextStep, setUserData, userData } = useContext(RegisterContext);
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur
  } = useFormik<InfoStepFormInputs>({
    initialValues: {
      email: userData.email,
      username: userData.username,
      password: userData.password,
      passwordConfirm: userData.passwordConfirm
    },
    validationSchema: InfoStepValidation,
    onSubmit: (data: InfoStepFormInputs) => {
      setUserData({
        ...userData,
        ...data
      });
      onNextStep();
    }
  });

  return (
    <Form
      title="📝 Регистрация"
      onSubmit={handleSubmit}
    >
      <Form.Field
        title="Email"
        placeholder="Введите email адрес"
        icon="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email && !!errors.email}
        message={errors.email}
      />
      <Form.Field
        title="Username"
        placeholder="Введите username"
        icon="user"
        name="username"
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.username && !!errors.username}
        message={errors.username}
      />
      <Form.Field
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
      <Form.Field
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
        Следующий шаг
      </Button>
      <Form.Footer
        text="Уже зарегистрированы?"
        to={{ url: '/login', title: 'Войти' }}
      />
    </Form>
  );
};

export default infoStep;
