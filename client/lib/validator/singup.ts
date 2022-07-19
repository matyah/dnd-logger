import * as yup from 'yup';
export const signupSchema = yup
  .object({
    email: yup.string().email().required('Please Enter your email'),
    password: yup
      .string()
      .required('Please Enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
  })
  .required();
