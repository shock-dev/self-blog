import * as Yup from 'yup';

export default Yup.object({
  username: Yup
    .string()
    .min(3, 'Username must be more than 3 characters')
    .max(16, 'Username must be shorter than 16 characters')
    .required('Required'),
  password: Yup
    .string()
    .min(6, 'Password must be more than 6 characters')
    .required('Required')
});
