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
import { clearNotification } from "../../application/store/auth/authSlice";

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearNotification());
  }, [dispatch]);

  return (
    <>
      {isAuthenticated && !user?.emailVerified && (
        <Notification
          message="Por favor, verifica tu dirección de correo electrónico."
          type="warning"
        />
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
