import React from "react";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  GRADIENTS,
  DARK_GRADIENTS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";

const WelcomeBanner = ({
  user,
  isAuthenticated,
  emailVerified,
}: {
  user: string | null | undefined;
  isAuthenticated: boolean | null | undefined;
  emailVerified: boolean | null | undefined;
}) => {
  return (
    <section
      className={`py-20 px-4 transition-colors  
        ${LIGHT_MODE_COLORS.BACKGROUND} 
        ${DARK_MODE_COLORS.BACKGROUND} 
        ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      <div
        className={`rounded-lg p-6 shadow-lg text-white text-center
        ${GRADIENTS.WELCOME_BANNER} ${DARK_GRADIENTS.WELCOME_BANNER}`}
      >
        <h1
          className={`text-3xl font-bold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
        >
          Bienvenido a ISOlytics
        </h1>
        <p
          className={`mt-2 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
        >
          {isAuthenticated ? (
            <>
              Hola, <strong>{user || "Usuario"}</strong>! Continúa trabajando en
              tu cumplimiento normativo.
              <br />
              {!emailVerified && (
                <>
                  Por favor, verifica tu correo electrónico para acceder a todas
                  las funciones.
                </>
              )}
            </>
          ) : (
            "Inicia sesión para acceder a tus herramientas de cumplimiento."
          )}
        </p>
      </div>
    </section>
  );
};

export default WelcomeBanner;
