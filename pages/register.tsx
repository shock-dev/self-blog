import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import withNotAuthSS from '../hocs/withNotAuth';
import { useDispatch, useSelector } from 'react-redux';
import { clearFields } from '../store/auth/actions';
import { selectAuthError, selectIsAuth } from '../store/auth/selectors';
import { useAlert } from 'react-alert';
import { useRouter } from 'next/router';
import InfoStep from '../components/RegisterSteps/InfoStep';
import PasswordStep from '../components/RegisterSteps/PasswordStep';

const RegisterSteps = {
  0: InfoStep,
  1: PasswordStep
};

interface RegisterContextProps {
  onNextStep: () => void;
  onBackStep: () => void;
  step: number,
  userData: RegisterFormInputs
  setUserData: Dispatch<SetStateAction<RegisterFormInputs>>
}

export const RegisterContext = createContext({} as RegisterContextProps);

export interface InfoStepFormInputs {
  email: string
  fullname: string
  username: string
}

export interface PasswordStepFormInputs {
  password: string
  passwordConfirm: string
}

export type BirthdayType = {
  day: number
  month: number
  year: number
}

export type RegisterFormInputs = InfoStepFormInputs & PasswordStepFormInputs & { birthday: BirthdayType }

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
    fullname: '',
    username: '',
    birthday: { day: 1, month: 0, year: 2000 },
    password: '',
    passwordConfirm: ''
  });

  const onNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const onBackStep = () => {
    setStep((prev) => prev - 1);
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

  useEffect(() => {
    if (isAuth) {
      router.replace('/');
    }
  }, [isAuth]);

  return (
    <AuthLayout title="Регистрация">
      <RegisterContext.Provider value={{ step, onNextStep, onBackStep, userData, setUserData }}>
        <CurrentStep />
      </RegisterContext.Provider>
    </AuthLayout>
  );
}

export const getServerSideProps = withNotAuthSS();
