import React from "react";
import { UI_COLORS, ANIMATION_TIMINGS } from "../../../shared/constants";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#729CAC]/40 sm:px-5 ${UI_COLORS.PRIMARY_BUTTON} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
