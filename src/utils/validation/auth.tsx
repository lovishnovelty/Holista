import * as Yup from 'yup';
export const loginSchema = Yup.object().shape({
  userName: Yup.string()
    .required('Email, Phone or Subscriber Number is required')
    .label('userName'),
  password: Yup.string().required('Password is required').label('password'),
  rememberMe: Yup.bool(),
});

export const verificationSchema = Yup.object().shape({
  code: Yup.number().label('medicaidId'),
  phone: Yup.number()
    .required('Phone Number is required')
    .test(
      'len',
      'Phone Number must be 10 numbers.',
      (val: any) => val && val.toString().length === 10,
    )
    .label('phone'),
  action: Yup.string(),
});

export const confirmationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .notOneOf([''], 'Required')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character',
    )
    .label('password'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .notOneOf([''], 'Required')
    .oneOf([Yup.ref('password'), null], "Passwords don't match!")
    .label('confirmPassword'),
});
