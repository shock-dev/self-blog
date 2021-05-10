import * as Yup from 'yup';

export default Yup.object({
  email: Yup
    .string()
    .email('Incorrect email')
    .required('Required'),
  username: Yup
    .string()
    .min(3, 'Username must be more than 3 characters')
    .max(16, 'Username must be shorter than 16 characters')
    .required('Required'),
  password: Yup
    .string()
    .min(6, 'Password must be more than 6 characters')
    .required('Required'),
  confirmPassword: Yup
    .string()
    .oneOf([Yup.ref('password')], 'There are no matches')
    .required('Required')
});
