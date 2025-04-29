import React from "react";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const ButtonSecundary: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`font-semibold px-6 py-3 mx-2 rounded-xl transition-all
                                                    ${LIGHT_MODE_COLORS.BUTTON_BG_SECONDARY} 
                                                    ${LIGHT_MODE_COLORS.BUTTON_HOVER_BG_SECONDARY} 
                                                    ${DARK_MODE_COLORS.BUTTON_BG_SECONDARY} 
                                                    ${DARK_MODE_COLORS.BUTTON_HOVER_BG_SECONDARY} 
                                                    ${ANIMATION_TIMINGS.TRANSITION_DURATION}
                                                    ${LIGHT_MODE_COLORS.TEXT_PRIMARY}
                                                    ${DARK_MODE_COLORS.TEXT_PRIMARY}
                                                    shadow-md`}
      onClick={onClick}
    >
      {children}
    </button>
  );};

export default ButtonSecundary;
