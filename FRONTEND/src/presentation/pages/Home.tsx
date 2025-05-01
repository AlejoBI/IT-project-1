import React, { useEffect } from "react";
import WelcomeBanner from "../components/home/WelcomeBanner";
import Features from "../components/home/Features";
import Benefits from "../components/home/Benefits";
import HowItWorks from "../components/home/HowItWorks";
import SupportedNorms from "../components/home/SupportedNorms";
import FinalCTA from "../components/home/FinalCTA";
import Notification from "../components/common/Notification";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  setNotification,
  clearNotification,
} from "../../application/store/auth/authSlice";

const HomePage = () => {
  const { user, isAuthenticated, notification } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated && user && !user.emailVerified) {
      dispatch(
        setNotification({
          message: "Por favor, verifica tu dirección de correo electrónico.",
          type: "warning",
        })
      );
      setTimeout(() => dispatch(clearNotification()), 3000);
    }
  }, [isAuthenticated, user, dispatch]);

  return (
    <>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <WelcomeBanner
        user={user?.name}
        isAuthenticated={isAuthenticated}
        emailVerified={user?.emailVerified}
      />
      <Features />
      <Benefits />
      <HowItWorks />
      <SupportedNorms />
      <FinalCTA
        user={user?.name}
        isAuthenticated={isAuthenticated}
        emailVerified={user?.emailVerified}
      />
    </>
  );
};

export default HomePage;
