import React, { useEffect, useState } from "react";
import Notification from "../components/common/Notification";
import LoginForm from "../components/forms/authForm/LoginForm";
import RegisterForm from "../components/forms/authForm/RegisterForm";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { clearNotification } from "../../application/store/auth/authSlice";
import logo from "../../assets/img/ISOlytics.webp";
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS, ANIMATION_TIMINGS, UI_COLORS } from "../../shared/constants";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AuthPage = () => {
  const { error, message } = useAuth();
  const dispatch = useAppDispatch();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    dispatch(clearNotification());
  }, [dispatch]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6">
      <header className="w-full max-w-md flex items-center gap-3 p-4 sm:p-6">
        <Link
          to="/"
          aria-label="Volver a la página principal"
          className={`flex items-center gap-2 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${LIGHT_MODE_COLORS.ACCENT} ${DARK_MODE_COLORS.ACCENT} transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
        >
          <ArrowLeft className="w-6 h-6" />
          <img
            src={logo}
            alt="ISOlytics Logo"
            className={`h-10 w-10 rounded-full border-2 shadow-md ${UI_COLORS.BORDER}`}
          />
        </Link>
      </header>

      <section
        className={`relative z-10 w-full max-w-md px-6 py-8 sm:p-8 space-y-6 rounded-2xl shadow-2xl ${LIGHT_MODE_COLORS.SIDEBAR_BG} ${DARK_MODE_COLORS.SIDEBAR_BG} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
      >
        <h1
          className={`text-2xl sm:text-3xl font-bold text-center transition-colors ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
        >
          Bienvenido a ISOlytics
        </h1>

        <p
          className={`text-sm sm:text-base text-center transition-colors ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
        >
          Inicia sesión o regístrate para continuar
        </p>

        <div className="w-full space-y-4">
          {message && <Notification message={message} type="success" />}
          {error && <Notification message={error} type="error" />}
          {isLogin ? (
            <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </section>
    </main>
  );
};

export default AuthPage;
