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

interface LoginFormProps {
  onSwitchToRegister: () => void; // Función para cambiar al formulario de registro
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

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl space-y-4 max-w-md mx-auto transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      {/* Campo de correo electrónico */}
      <div className="flex flex-col">
        <Label htmlFor="email" children="Correo Electrónico:" />
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "El correo electrónico es obligatorio",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Dirección de correo electrónico no válida",
            },
          })}
          className={`p-3 border rounded-lg outline-none focus:ring-2 ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-all ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
        />
        {errors.email && (
          <p className={`text-red-500 dark:text-red-400 text-sm mt-1`}>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Campo de contraseña */}
      <div className="flex flex-col">
        <Label htmlFor="password" children="Contraseña:" />
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "La contraseña es obligatoria",
          })}
          className={`p-3 border rounded-lg outline-none focus:ring-2 ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-all ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
        />
        {errors.password && (
          <p className={`text-red-500 dark:text-red-400 text-sm mt-1`}>
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Botón de envío */}
      <div className="flex justify-center mt-4">
        <Button children="Iniciar Sesión" type="submit" />
      </div>

      {/* Enlace para cambiar al formulario de registro */}
      <p className="text-center text-sm">
        <span
          className={`${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${LIGHT_MODE_COLORS.TEXT_PRIMARY_HOVER} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY_HOVER}`}
        >
          ¿No tienes una cuenta?{" "}
        </span>
        <span
          className="text-indigo-500 dark:text-indigo-400 cursor-pointer hover:underline transition-colors"
          onClick={onSwitchToRegister}
        >
          Regístrate aquí
        </span>
        <br />
        <a
          href="/recover-password"
          className={`${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${LIGHT_MODE_COLORS.TEXT_PRIMARY_HOVER} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY_HOVER} hover:underline`}
        >
          Olvidaste tu contraseña?
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
