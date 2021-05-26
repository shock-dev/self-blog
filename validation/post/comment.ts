import * as Yup from 'yup';

export default Yup.object({
  text: Yup
    .string()
    .required('Comment should not be empty')
});
