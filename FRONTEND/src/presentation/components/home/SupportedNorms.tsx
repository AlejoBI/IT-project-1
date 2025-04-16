import React from "react";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";
import { norms } from "../../../shared/utils"

const SupportedNorms = () => (
  <section
    className={`py-16 px-4 bg-white ${DARK_MODE_COLORS.BACKGROUND} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
  >
    <div className="max-w-5xl mx-auto text-center">
      <h2
        className={`text-3xl font-bold mb-8 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
      >
        Normativas soportadas
      </h2>
      <div
        className={`flex flex-wrap justify-center gap-4 ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
      >
        {norms.map((norm, idx) => (
          <span
            key={idx}
            className={`px-4 py-2 rounded-full shadow text-sm font-medium 
            ${LIGHT_MODE_COLORS.SIDEBAR_BG} ${DARK_MODE_COLORS.SIDEBAR_BG} hover:scale-105 transition-transform ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
          >
            {norm}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default SupportedNorms;
