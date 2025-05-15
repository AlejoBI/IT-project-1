import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import {
  registerUser,
  logoutUser,
} from "../../../../application/store/auth/authActions";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../../shared/constants";
import Button from "../../UI/Button";
import Label from "../../UI/Label";
import { sendEmailNotification } from "../../notification/sendEmailNotification";
import { EmailTemplateType } from "../../../../domain/models/types/notificationTypes";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

interface RegisterFormValues {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const dispatch = useAppDispatch();
  const urlDeploy = import.meta.env.VITE_URL_DEPLOY || "http://localhost:5173";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onFormSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    dispatch(registerUser(data));
    dispatch(logoutUser());
    sendEmailNotification({
      to: data.email,
      subject: "Bienvenido a ISOlytics",
      currentName: data.name,
      appName: "ISOlytics",
      buttonText: "Explorar",
      buttonUrl: `${urlDeploy}/`,
      plainTextContent: `Bienvenido a ISOlytics, ${data.name}. Haz clic aquí para comenzar.`,
      type: EmailTemplateType.WELCOME,
      dispatch,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl space-y-4 max-w-md mx-auto transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      {/* Campo de nombre de usuario */}
      <div className="flex flex-col">
        <Label htmlFor="username" children="Nombre de Usuario:" />
        <input
          type="text"
          id="username"
          {...register("username", {
            required: "El nombre de usuario es obligatorio",
          })}
          className={`p-3 border rounded-lg outline-none focus:ring-2 ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-all ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
        />
        {errors.username && (
          <p className={`text-red-500 dark:text-red-400 text-sm mt-1`}>
            {errors.username.message}
          </p>
        )}
      </div>

      {/* Campo de nombre completo */}
      <div className="flex flex-col">
        <Label htmlFor="name" children="Nombre:" />
        <input
          type="text"
          id="name"
          {...register("name", {
            required: "El nombre completo es obligatorio",
          })}
          className={`p-3 border rounded-lg outline-none focus:ring-2 ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-all ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
        />
        {errors.name && (
          <p className={`text-red-500 dark:text-red-400 text-sm mt-1`}>
            {errors.name.message}
          </p>
        )}
      </div>

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

      {/* Confirmación de contraseña */}
      <div className="flex flex-col">
        <Label htmlFor="confirmPassword" children="Confirmar Contraseña:" />
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "La confirmación de contraseña es obligatoria",
            validate: (value) =>
              value === watch("password") || "Las contraseñas no coinciden",
          })}
          className={`p-3 border rounded-lg outline-none focus:ring-2 ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-all ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
        />
        {errors.confirmPassword && (
          <p className={`text-red-500 dark:text-red-400 text-sm mt-1`}>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Botón de envío */}
      <div className="flex justify-center mt-4">
        <Button children="Registrarse" type="submit" />
      </div>

      {/* Enlace para cambiar al formulario de login */}
      <p className="text-center text-sm">
        <span
          className={`text-gray-600 dark:text-gray-400 ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
        >
          ¿Ya estás registrado?{" "}
        </span>
        <span
          className="text-indigo-500 dark:text-indigo-400 cursor-pointer hover:underline transition-colors"
          onClick={onSwitchToLogin}
        >
          Inicia sesión aquí
        </span>
      </p>
    </form>
  );
};

export default RegisterForm;
