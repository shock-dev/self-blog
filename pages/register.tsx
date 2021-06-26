import React, { createContext, Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import withNotAuthSS from '../hocs/withNotAuth';
import { useDispatch, useSelector } from 'react-redux';
import { clearFields, registerRequest } from '../store/auth/actions';
import { selectAuthError, selectIsAuth } from '../store/auth/selectors';
import { useAlert } from 'react-alert';
import { useRouter } from 'next/router';
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

export default function Register() {
  const dispatch = useDispatch();
  const [step, setStep] = React.useState(0);
  const CurrentStep = RegisterSteps[step];
  const router = useRouter();
  const alert = useAlert();
  const isAuth = useSelector(selectIsAuth);
  const error = useSelector(selectAuthError);
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

  const registerHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerRequest(userData, router));
  };

  useEffect(() => {
    if (error !== null) {
      alert.error(error);
    }

    return () => {
      if (!isAuth) {
        dispatch(clearFields());
      }
    };
  }, [error]);

  const ContextValue = {
    step,
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
}

export const getServerSideProps = withNotAuthSS();
