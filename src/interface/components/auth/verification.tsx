import {FormInterface} from '../../../interface';

interface Errors {
  medicaidId?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

interface VerificationInterface {
  values: FormInterface;
  errors: Errors;
  touched: any;
  handleChange: (val: any) => any;
  submitForm: Function;
  loading: boolean;
  ApiError: any;
  setApiError: Function;
  maxLength?: number;
}

export {VerificationInterface};
