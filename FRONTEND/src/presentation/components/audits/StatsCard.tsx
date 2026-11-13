import React from "react";
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS, ANIMATION_TIMINGS, UI_COLORS } from "../../../shared/constants";

interface StatsCardProps {
  title: string;
  value: number | string;
  description: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, description }) => {
  return (
    <div
      className={`rounded-2xl border p-4 shadow-sm transition-all sm:p-6 ${ANIMATION_TIMINGS.TRANSITION_DURATION} ${UI_COLORS.SURFACE} ${UI_COLORS.BORDER} hover:-translate-y-1 hover:shadow-md`}
    >
      <div className="flex items-center justify-between">
        <h3
          className={`text-base sm:text-lg font-semibold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
        >
          {title}
        </h3>
      </div>

      <p
        className={`text-2xl sm:text-3xl font-bold mt-3 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
      >
        {value}
      </p>
      <p
        className={`text-xs sm:text-sm mt-2 ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
      >
        {description}
      </p>
    </div>
  );
};

export default StatsCard;
