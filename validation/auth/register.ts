import * as Yup from 'yup';
import { ValidationConfig } from '../config';

export const InfoStepValidation = Yup.object({
  email: Yup
    .string()
    .email(ValidationConfig.Email)
    .required(ValidationConfig.Required),

  fullname: Yup
    .string()
    .min(3, 'Минимальная длина имени 3 символа')
    .max(30, 'Полное имя не должен превышать 30 символов')
    .required(ValidationConfig.Required),

  username: Yup
    .string()
    .min(3, 'Минимальная длина username 3 символа')
    .max(16, 'Username не должен превышать 16 символов')
    .required(ValidationConfig.Required)
});

export const PasswordStepValidation = Yup.object({
  password: Yup
    .string()
    .min(6, 'Минимальная длина пароля 6 символов')
    .required(ValidationConfig.Required),

  passwordConfirm: Yup
    .string()
    .oneOf([Yup.ref('password')], 'Нет совпадений')
    .required(ValidationConfig.Required)
});
