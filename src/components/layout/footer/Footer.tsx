import React from "react";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../utils/constants";

const Footer = () => {
  return (
    <footer
      className={`${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND} text-gray-800 dark:text-gray-200 py-8 mt-auto shadow-md transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Sección de información del proyecto */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3
            className={`text-lg font-bold ${LIGHT_MODE_COLORS.ACCENT} ${DARK_MODE_COLORS.ACCENT} transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
          >
            Herramienta de Medición de Cumplimiento Normativo
          </h3>
          <p
            className={`text-sm ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY} transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
          >
            Software diseñado para evaluar y mejorar el cumplimiento con
            normativas internacionales.
          </p>
          <p
            className={`text-sm ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY} mt-2 transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
          >
            Version 1.0 | Fecha: 26/02/2025
          </p>
        </div>

        {/* Enlaces útiles */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-center">
          <a
            href="/about"
            className={`${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY} hover:${LIGHT_MODE_COLORS.ACCENT} dark:hover:${DARK_MODE_COLORS.ACCENT} transition-all ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
          >
            Acerca de
          </a>
          <a
            href="/contact"
            className={`${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY} hover:${LIGHT_MODE_COLORS.ACCENT} dark:hover:${DARK_MODE_COLORS.ACCENT} transition-all ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
          >
            Contacto
          </a>
          <a
            href="/documentation"
            className={`${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY} hover:${LIGHT_MODE_COLORS.ACCENT} dark:hover:${DARK_MODE_COLORS.ACCENT} transition-all ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
          >
            Documentación
          </a>
          <a
            href="/privacy-policy"
            className={`${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY} hover:${LIGHT_MODE_COLORS.ACCENT} dark:hover:${DARK_MODE_COLORS.ACCENT} transition-all ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
          >
            Política de Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
