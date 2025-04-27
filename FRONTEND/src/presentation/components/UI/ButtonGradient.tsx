import React from "react";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
  GRADIENTS,
  DARK_GRADIENTS,
} from "../../../shared/constants";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`mt-8 font-semibold px-6 py-3 rounded-xl transition-all
                        ${GRADIENTS.BUTTON_BG} 
                        ${LIGHT_MODE_COLORS.BUTTON_HOVER_BG} 
                        ${DARK_GRADIENTS.BUTTON_BG} 
                        ${DARK_MODE_COLORS.BUTTON_HOVER_BG} 
                        ${ANIMATION_TIMINGS.TRANSITION_DURATION}
                        ${LIGHT_MODE_COLORS.TEXT_PRIMARY}
                        ${DARK_MODE_COLORS.TEXT_PRIMARY}
                        shadow-md`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;