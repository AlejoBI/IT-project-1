import React from "react";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";

const HowItWorks = () => (
  <section
    className={`py-16 px-4 ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.SIDEBAR_BG} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
  >
    <div className="max-w-4xl mx-auto text-center">
      <h2 className={`text-3xl font-bold mb-10 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}>
        ¿Cómo funciona?
      </h2>
      <ol
        className={`text-left space-y-6 max-w-xl mx-auto text-lg ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
      >
        <li><strong>1.</strong> Selecciona el marco (ISO 9001, ITIL 4, NIST…)</li>
        <li><strong>2.</strong> Realiza evaluaciones y documenta controles</li>
        <li><strong>3.</strong> Genera reportes y gestiona auditorías</li>
      </ol>
    </div>
  </section>
);

export default HowItWorks;