import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { loginUser } from "../../../../application/store/auth/authActions";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../../shared/constants";
import Button from "../../UI/Button";
import Label from "../../UI/Label";
import { LogIn } from "lucide-react";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onFormSubmit: SubmitHandler<LoginFormValues> = (data) => {
    dispatch(loginUser(data));
  };

  const inputClassName = `
    p-3 border rounded-lg outline-none focus:ring-2 
    ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND}
    ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}
    focus:ring-indigo-400 dark:focus:ring-indigo-500
    transition-all ${ANIMATION_TIMINGS.TRANSITION_DURATION}
  `;

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="bg-white dark:bg-gray-800 px-4 py-6 sm:p-6 rounded-2xl shadow-2xl space-y-4 w-full max-w-md mx-auto transition-colors"
    >
      <div className="flex flex-col">
        <Label htmlFor="email">Correo Electrónico:</Label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "El correo electrónico es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Correo electrónico inválido",
            },
          })}
          className={inputClassName}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <Label htmlFor="password">Contraseña:</Label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "La contraseña es obligatoria",
          })}
          className={inputClassName}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <Button type="submit">
          <span className="flex items-center gap-2">
            Iniciar Sesión
            <LogIn className="w-4 h-4" />
          </span>
        </Button>
      </div>

      <p
        className={`text-center text-sm ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
      >
        ¿No tienes una cuenta?{" "}
        <span
          onClick={onSwitchToRegister}
          className={`${LIGHT_MODE_COLORS.ACCENT} ${DARK_MODE_COLORS.ACCENT} cursor-pointer hover:underline ${LIGHT_MODE_COLORS.TEXT_PRIMARY_HOVER} ${DARK_MODE_COLORS.TEXT_PRIMARY_HOVER}`}
        >
          Regístrate aquí
        </span>
        <br />
        <a
          href="/recover-password"
          className={`${LIGHT_MODE_COLORS.ACCENT} ${DARK_MODE_COLORS.ACCENT} hover:underline ${LIGHT_MODE_COLORS.TEXT_PRIMARY_HOVER} ${DARK_MODE_COLORS.TEXT_PRIMARY_HOVER}`}
        >
          ¿Olvidaste tu contraseña?
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
