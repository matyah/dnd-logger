import * as yup from 'yup';

export const signinSchema = yup
  .object({
    email: yup.string().email().required('Please Enter your email'),
    password: yup.string().required('Please Enter your password'),
  })
  .required();
