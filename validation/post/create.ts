import * as Yup from 'yup';
import { ValidationConfig } from '../config';

export default Yup.object({
  title: Yup
    .string()
    .min(3, 'Минимальная длина названия поста 3 символа')
    .max(70, 'Название поста не должно превышать 70 символов')
    .required(ValidationConfig.Required),

  description: Yup
    .string()
    .min(10, 'Минимальная длина описания 10 символов')
    .max(5000, 'Описание поста не должно превышать 5000 символов')
    .required(ValidationConfig.Required)
});
