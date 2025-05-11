import React, { useEffect } from "react";
import AuthForm from "../components/forms/authForm/AuthForm";
import Notification from "../components/common/Notification";

import { useAuth } from "../hooks/useAuth";
import logo from "../../assets/img/ISOlytics.webp"; // Asegúrate de tener un logo en tu proyecto
import { useAppDispatch } from "../hooks/useAppDispatch";
import { clearNotification } from "../../application/store/auth/authSlice";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../shared/constants";

const AuthPage = () => {
  const { error, message } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearNotification());
  }, [dispatch]);

  return (
    <>
      {/* Notificación de errores */}
      {error && <Notification message={error} type="error" />}
      {message && <Notification message={message} type="success" />}

      {/* Contenedor principal */}
      <div
        className={`flex items-center justify-center min-h-screen transform-colors ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
      >
        {/* Contenido central */}
        <div
          className={`relative z-10 flex flex-col items-center justify-center w-full max-w-md p-8 space-y-6 ${LIGHT_MODE_COLORS.SIDEBAR_BG} ${DARK_MODE_COLORS.SIDEBAR_BG} rounded-lg shadow-2xl transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
        >
          {/* Logo */}
          <a href="/">
            <img
              src={logo}
              alt="ByteForge Logo"
              className={`w-20 h-20 mb-4 rounded-full shadow-lg transition-transform ${ANIMATION_TIMINGS.TRANSITION_DURATION} hover:scale-110`}
            />
          </a>

          {/* Título */}
          <h1
            className={`text-3xl font-bold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
          >
            Bienvenido a ISOlytics
          </h1>

          {/* Subtítulo */}
          <p
            className={`text-sm ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY} transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
          >
            Inicia sesión o regístrate para continuar
          </p>

          {/* Formulario de autenticación */}
          <AuthForm />
        </div>
      </div>
    </>
  );
};

export default AuthPage;
