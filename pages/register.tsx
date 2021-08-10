import React, { createContext, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { useAlert } from 'react-alert';
import AuthLayout from '../layouts/AuthLayout';
import protectFromAuthorizedUsers from '../hocs/protectFromAuthorizedUsers';
import AuthApi from '../api/auth';
import InfoStep from '../components/RegisterSteps/InfoStep';
import AdditionalStep from '../components/RegisterSteps/AdditionalStep';
import ResultStep from '../components/RegisterSteps/ResultStep';

const RegisterSteps = {
  0: InfoStep,
  1: AdditionalStep,
  2: ResultStep
};

interface RegisterContextProps {
  onNextStep: () => void;
  onBackStep: () => void;
  step: number,
  userData: RegisterFormInputs
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  setUserData: Dispatch<SetStateAction<RegisterFormInputs>>
  registerHandler: (e: FormEvent<HTMLFormElement>) => any
}

export const RegisterContext = createContext({} as RegisterContextProps);

export interface InfoStepFormInputs {
  email: string
  username: string
  password: string
  passwordConfirm: string
}

export interface AdditionInfoStepFormInputs {
  name: string
  surname: string
  gender: {
    label: string
    value: string
  }
  birthday: {
    day: number
    month: number
    year: number
  }
}

export type RegisterFormInputs =
  & InfoStepFormInputs
  & AdditionInfoStepFormInputs

const Register = () => {
  const alert = useAlert();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const CurrentStep = RegisterSteps[step];
  const router = useRouter();
  const [userData, setUserData] = useState<RegisterFormInputs>({
    email: '',
    username: '',
    name: '',
    surname: '',
    birthday: { day: 1, month: 0, year: 2000 },
    gender: { label: 'Мужской', value: 'male' },
    password: '',
    passwordConfirm: ''
  });

  const onNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const onBackStep = () => {
    setStep((prev) => prev - 1);
  };

  const registerHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { gender, birthday } = userData;

    const payload = {
      ...userData,
      gender: gender.value,
      birthday: new Date(birthday.year, birthday.month, birthday.day).toISOString()
    };
    try {
      setLoading(true);
      // Getting token
      const { data } = await AuthApi.register(payload);
      setCookie(null, 'authToken', data, {
        maxAge: 30 * 24 * 60 * 60 * 1000
      });
      await router.replace('/');
    } catch (e) {
      const { data } = e.response.data;
      if (!data) {
        alert.error('Что-то пошло не так, попробуйте снова');
      } else {
        alert.error(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const ContextValue = {
    step,
    loading,
    setLoading,
    onNextStep,
    onBackStep,
    userData,
    setUserData,
    registerHandler
  };

  return (
    <AuthLayout title="Регистрация">
      <RegisterContext.Provider value={ContextValue}>
        <CurrentStep />
      </RegisterContext.Provider>
    </AuthLayout>
  );
};

export const getServerSideProps = protectFromAuthorizedUsers();

export default Register;
