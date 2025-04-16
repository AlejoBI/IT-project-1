import React from "react";
import {
  GRADIENTS,
  DARK_GRADIENTS,
  ANIMATION_TIMINGS,
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
} from "../../../shared/constants";
import Button from "../UI/Button";

const onSubmit = () => {
  window.location.href = "/login";
};

const FinalCTA = ({
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
      className={`py-20 px-4 text-center transition-all 
        ${GRADIENTS.WELCOME_BANNER} 
        ${DARK_GRADIENTS.WELCOME_BANNER} 
        ${ANIMATION_TIMINGS.TRANSITION_DURATION}
        ${LIGHT_MODE_COLORS.TEXT_PRIMARY}
        ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
    >
      <h2 className="text-3xl font-bold mb-4">
        ¿Listo para fortalecer tu cumplimiento?
      </h2>

      <p className="mt-2">
        {isAuthenticated && (
          <>
            {!emailVerified && (
              <>
                Por favor, verifica tu correo electrónico para acceder a todas
                las funciones.
              </>
            )}
          </>
        )}
        {!isAuthenticated && (
          <>
            <Button onClick={onSubmit} children="Empieza ahora" type="submit" />{" "}
          </>
        )}
      </p>
    </section>
  );
};

export default FinalCTA;
