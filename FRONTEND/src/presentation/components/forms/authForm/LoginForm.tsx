import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { loginUser } from "../../../../application/store/auth/authActions";

import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../../shared/constants";

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
        <label
          htmlFor="email"
          className={`font-medium text-sm mb-1 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
        >
          Email:
        </label>
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
        <label
          htmlFor="password"
          className={`font-medium text-sm mb-1 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
        >
          Contraseña:
        </label>
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
      <button
        type="submit"
        className={`w-full bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white p-3 rounded-lg font-medium transition-all ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
      >
        Iniciar Sesión
      </button>

      {/* Enlace para cambiar al formulario de registro */}
      <p className="text-center text-sm">
        <span
          className={`text-gray-600 dark:text-gray-400 ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
        >
          ¿No tienes una cuenta?{" "}
        </span>
        <span
          className="text-indigo-500 dark:text-indigo-400 cursor-pointer hover:underline transition-colors"
          onClick={onSwitchToRegister}
        >
          Regístrate aquí
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
