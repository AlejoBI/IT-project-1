import React, { useEffect } from "react";
import WelcomeBanner from "../components/home/WelcomeBanner";
import Features from "../components/home/Features";
import Benefits from "../components/home/Benefits";
import HowItWorks from "../components/home/HowItWorks";
import SupportedNorms from "../components/home/SupportedNorms";
import FinalCTA from "../components/home/FinalCTA";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { clearNotification } from "../../application/store/auth/authSlice";
import Loader from "../components/common/Loader";

const HomePage = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearNotification());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <WelcomeBanner user={user?.name} isAuthenticated={isAuthenticated} />
      <Features />
      <Benefits />
      <HowItWorks />
      <SupportedNorms />
      <FinalCTA user={user?.name} isAuthenticated={isAuthenticated} />
    </>
  );
};

export default HomePage;
