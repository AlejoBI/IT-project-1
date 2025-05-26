import React from "react";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";

interface Props {
  title: string;
  description: string;
}

const AboutCard: React.FC<Props> = ({ title, description }) => {
  return (
    <div
      className={`rounded-xl shadow-md p-6 transition-all ${LIGHT_MODE_COLORS.BACKGROUND_COMPONENT} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      <h3
        className={`text-xl font-semibold mb-2 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
      >
        {title}
      </h3>
      <p
        className={`${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
      >
        {description}
      </p>
    </div>
  );
};

export default AboutCard;
