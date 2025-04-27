import React from "react";
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS } from "../../../shared/constants";

interface LabelProps {
  htmlFor: string; // ID del input al que está asociado
  children: React.ReactNode; // Texto del label
}

const Label: React.FC<LabelProps> = ({ htmlFor, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`font-medium mb-1font-medium text-sm mb-1 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
    >
      {children}
    </label>
  );
};

export default Label;
