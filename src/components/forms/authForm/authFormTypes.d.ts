export interface AuthFormInputs {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthFormProps {
  mode: string;
}
