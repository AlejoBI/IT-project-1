import React from "react";
import { useAuth } from "../hooks/useAuth";
import Notification from "../components/common/Notification";

import { LIGHT_MODE_COLORS, DARK_MODE_COLORS } from "../../shared/constants";

const Compliance = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <p>Debes iniciar sesión para acceder a esta página.</p>;
  }

  return (
    <>
      <h1
        className={`text-3xl font-bold mb-6 text-center
                ${LIGHT_MODE_COLORS.TEXT_PRIMARY} 
                ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
      >
        Evaluación Normativa
      </h1>
      {!user?.emailVerified && (
        <Notification
          message="Por favor, verifica tu dirección de correo electrónico."
          type="warning"
        />
      )}
    </>
  );
};

export default Compliance;
