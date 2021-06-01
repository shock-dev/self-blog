import * as Yup from 'yup';
import { ValidationConfig } from '../config';

export default Yup.object({
  email: Yup
    .string()
    .email(ValidationConfig.Email)
    .required(ValidationConfig.Required),

  password: Yup
    .string()
    .required(ValidationConfig.Required)
});
