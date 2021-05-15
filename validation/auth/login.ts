import * as Yup from 'yup';

export default Yup.object({
  email: Yup
    .string()
    .email('Incorrect email')
    .required('Required'),
  password: Yup
    .string()
    .min(6, 'Password must be more than 6 characters')
    .required('Required')
});
