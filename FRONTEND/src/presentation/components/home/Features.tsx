import React from "react";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";
import Norm from "../../../assets/img/Norm.webp";

const Features = () => (
  <section
    className={`py-16 px-4 ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.SIDEBAR_BG} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
  >
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2
          className={`text-3xl font-bold mb-4 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
        >
          El cumplimiento no debería ser un dolor de cabeza
        </h2>
        <p
          className={`${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
        >
          Simplifica tu trabajo con una plataforma que organiza y guía tus
          autoevaluaciones, auditorías y reportes , diseñada específicamente
          para estándares como <strong>ISO 9001, ITIL 4, NIST y más.</strong>
        </p>
      </div>
      <img
        src={Norm}
        alt="Ilustración de cumplimiento"
        className={`object-contain rounded-lg shadow-lg hover:scale-105 transition-transform ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
      />
    </div>
  </section>
);

export default Features;
