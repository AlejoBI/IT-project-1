import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";

const QuickActionCard = ({
  title,
  description,
  to,
  icon,
}: {
  title: string;
  description: string;
  to: string; 
  icon: string;
}) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(to); 
  };

  return (
    <div
      onClick={handleNavigation} 
      className={`block p-4 rounded-lg shadow-md dark:hover:shadow-2xl hover:shadow-xl cursor-pointer ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} transition-all ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
      role="button" 
      tabIndex={0} 
    >
      <div className="flex items-center space-x-4">
        <span className="text-3xl">{icon}</span>
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickActionCard;
