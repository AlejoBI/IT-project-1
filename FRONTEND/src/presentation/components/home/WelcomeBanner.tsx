import React from "react";
import { Link } from "react-router-dom";
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
}: {
  user: string | null | undefined;
  isAuthenticated: boolean | null | undefined;
}) => {
  return (
    <section
      className={`py-20 px-4 transition-colors  
        ${LIGHT_MODE_COLORS.BACKGROUND} 
        ${DARK_MODE_COLORS.BACKGROUND} 
        ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      <div
        className={`mx-auto max-w-5xl rounded-lg p-8 text-center text-white shadow-lg sm:p-12
        ${GRADIENTS.WELCOME_BANNER} ${DARK_GRADIENTS.WELCOME_BANNER}`}
      >
        <h1
          className={`text-3xl font-bold sm:text-5xl ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
        >
          Convierte el cumplimiento en decisiones claras
        </h1>
        <p
          className={`mx-auto mt-5 max-w-2xl text-base leading-7 sm:text-lg ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
        >
          {isAuthenticated ? (
            <>
              Hola, <strong>{user || "Usuario"}</strong>! Continúa trabajando en tu cumplimiento
              normativo.
            </>
          ) : (
            "Evalúa tus controles, identifica brechas y sigue el avance de tus acciones en un solo lugar."
          )}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to={isAuthenticated ? "/self-assessments" : "/login"}
            className="rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 shadow transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-700"
          >
            {isAuthenticated ? "Continuar evaluación" : "Comenzar ahora"}
          </Link>
          <Link
            to="/about"
            className="rounded-lg border border-white/70 px-6 py-3 font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-700"
          >
            Conocer ISOlytics
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
