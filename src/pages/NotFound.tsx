import React from "react";
import { Link } from "react-router-dom";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../utils/constants";

const NotFoundPage = () => {
  return (
    <div
      className={`min-h-screen flex items-center justify-center ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND} transitions-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION} rounded-lg`}
    >
      <div className="text-center">
        {/* Código de error */}
        <h1
          className={`text-6xl font-bold ${LIGHT_MODE_COLORS.ACCENT} ${DARK_MODE_COLORS.ACCENT}`}
        >
          404
        </h1>

        {/* Mensaje principal */}
        <p
          className={`mt-4 text-2xl font-semibold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
        >
          Oops! Página no encontrada.
        </p>

        {/* Descripción adicional */}
        <p
          className={`mt-2 ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
        >
          La página que estás buscando no existe o fue movida.
        </p>

        {/* Botón para volver al inicio */}
        <div className="mt-6">
          <Link
            to="/"
            className={`${LIGHT_MODE_COLORS.BUTTON_BG} ${DARK_MODE_COLORS.BUTTON_BG} text-white px-6 py-3 rounded-lg shadow-md ${LIGHT_MODE_COLORS.BUTTON_HOVER_BG} ${DARK_MODE_COLORS.BUTTON_HOVER_BG} transition`}
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
