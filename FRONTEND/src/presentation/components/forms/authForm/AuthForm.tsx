import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Notification from "../../common/Notification";
import { useAuth } from "../../../hooks/useAuth";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToRegister = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  const { message, error } = useAuth();

  return (
    <>
      {message && <Notification message={message} type="success" />}
      {error && <Notification message={error} type="error" />}

      {isLogin ? (
        <LoginForm onSwitchToRegister={switchToRegister} />
      ) : (
        <RegisterForm onSwitchToLogin={switchToLogin} />
      )}
    </>
  );
};

export default AuthForm;
