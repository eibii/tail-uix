export type Props = {
  modelValue?: string | number;
  validate?: any;
  submitted?: boolean;
  type?: "text" | "password" | "number";
  label?: string;
  icon?: string;
  disabled?: boolean;
  required?: boolean;
  isShowPassword?: boolean;
  mask?: string;
  texts: {
    validateRequired: string;
    validateEmail: string;
    validateStrongPassword: string;
  };
};
