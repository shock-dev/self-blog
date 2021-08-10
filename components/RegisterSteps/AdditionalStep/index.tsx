import React, { useContext } from 'react';
import { useFormik } from 'formik';
import Button from '../../Button';
import Form from '../../Form';
import { RegisterContext } from '../../../pages/register';
import Birthday from '../../Settings/Birthday';
import { AdditionInfoStepFormInputs } from '../../../pages/register';
import Select from '../../Select';
import styles from './AdditionalStep.module.scss';
import { AdditionalStepValidation } from '../../../validation/auth/register';

const allGender = [
  { label: 'Мужской', value: 'male' },
  { label: 'Женский', value: 'female' }
];

const AdditionalStep = () => {
  const { onBackStep, userData, setUserData, onNextStep } = useContext(RegisterContext);
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur
  } = useFormik<AdditionInfoStepFormInputs>({
    initialValues: {
      name: userData.name,
      surname: userData.surname,
      gender: userData.gender,
      birthday: userData.birthday
    },
    validationSchema: AdditionalStepValidation,
    onSubmit: (data: AdditionInfoStepFormInputs) => {
      setUserData({
        ...userData,
        name: data.name,
        surname: data.surname
      });
      onNextStep();
    }
  });

  const handlerChangeGender = (gender) => {
    setUserData({
      ...userData,
      gender
    });
  };

  const handleChangeDate = (birthday) => {
    setUserData({
      ...userData,
      birthday
    });
  };

  const { day, month, year } = userData.birthday;

  const handleBack = () => {
    setUserData({
      ...userData,
      name: values.name,
      surname: values.surname
    });
    onBackStep();
  };

  return (
    <Form
      title="👔 Дополнительно"
      onSubmit={handleSubmit}
    >
      <Form.Field
        title="Имя"
        placeholder="Введите имя"
        icon="name"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name && !!errors.name}
        message={errors.name}
      />
      <Form.Field
        title="Фамилия"
        placeholder="Введите фамилию"
        icon="surname"
        name="surname"
        value={values.surname}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.surname && !!errors.surname}
        message={errors.surname}
      />
      <Birthday
        day={day}
        month={month}
        year={year}
        onChange={handleChangeDate}
      />
      <div>
        <span className={styles.genderTitle}>
          Пол:
        </span>
        <Select
          id="gender"
          options={allGender}
          selectedOption={userData.gender}
          handleChange={handlerChangeGender}
        />
      </div>
      <Button
        color="green"
        type="submit"
        around
        full
      >
        Следующий шаг
      </Button>
      <Button
        color="blue"
        customStyles={{ marginTop: '10px' }}
        onClick={handleBack}
        around
        outline
        full
      >
        Назад
      </Button>
    </Form>
  );
};

export default AdditionalStep;
