import * as Yup from 'yup';
import { ValidationConfig } from '../config';

export const UpdateUserValidation = Yup.object({
  email: Yup
    .string()
    .email(ValidationConfig.Email)
    .required(ValidationConfig.Required),

  username: Yup
    .string()
    .min(3, 'Минимальная длина username 3 символа')
    .max(16, 'Username не должен превышать 16 символов')
    .required(ValidationConfig.Required),

  bio: Yup
    .string()
    .max(100, 'Bio не должен превышать 100 символов')
});
