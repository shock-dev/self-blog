import React, { useContext } from 'react';
import Field from '../Form/Field';
import Button from '../Button';
import Footer from '../Form/Footer';
import Form from '../Form';
import { useFormik } from 'formik';
import { InfoStepValidation } from '../../validation/auth/register';
import { BirthdayType, InfoStepFormInputs, RegisterContext } from '../../pages/register';
import Birthday from '../Settings/Birthday';

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
      fullname: userData.fullname,
      username: userData.username
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

  const handleChangeDate = (date: BirthdayType) => {
    setUserData({
      ...userData,
      birthday: date
    });
  };

  const { day, month, year } = userData.birthday;

  return (
    <Form
      title="Регистрация"
      onSubmit={handleSubmit}
    >
      <Field
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
      <Field
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
      <Birthday
        day={day}
        month={month}
        year={year}
        onChange={handleChangeDate}
      />
      <Field
        title="Полное имя"
        placeholder="Имя фамилия"
        icon="fullname"
        name="fullname"
        value={values.fullname}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.fullname && !!errors.fullname}
        message={errors.fullname}
      />
      <Button
        color="green"
        type="submit"
        around
        full
      >
        Следующий шаг
      </Button>
      <Footer
        text="Уже зарегестрированы?"
        to={{ url: '/login', title: 'Войти' }}
      />
    </Form>
  );
};

export default infoStep;
