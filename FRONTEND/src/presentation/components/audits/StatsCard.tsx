import React from "react";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";

interface StatsCardProps {
  title: string;
  value: number | string;
  description: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, description }) => {
  return (
    <div
      className={`p-6 rounded-xl shadow-md transition-all ${ANIMATION_TIMINGS.TRANSITION_DURATION}
        ${LIGHT_MODE_COLORS.BACKGROUND_COMPONENT} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT}
        hover:scale-105`}
    >
      <div className="flex items-center justify-between">
        <h3
          className={`text-lg font-semibold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
        >
          {title}
        </h3>
      </div>

      <p
        className={`text-3xl font-bold mt-4 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
      >
        {value}
      </p>
      <p
        className={`text-sm mt-2 ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
      >
        {description}
      </p>
    </div>
  );
};

export default StatsCard;
