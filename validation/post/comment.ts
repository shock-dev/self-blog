import * as Yup from 'yup';

export default Yup.object({
  text: Yup
    .string()
    .required('Комментарий не должен быть пустым')
});
