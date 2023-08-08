export interface FormInterface {
  userName?: string;
  code?: number;
  phone?: number;
  action?: string;
  rememberMe?: boolean;
  password?: string;
}

export interface ConfirmationInterface {
  password?: string;
  confirmPassword?: string;
}
