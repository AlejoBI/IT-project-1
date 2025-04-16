import React, { useState } from "react";
import { normatives } from "../../../shared/utils";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";

interface NormativeSelectorProps {
  onNormativeChange: (questions: any[]) => void;
}

const NormativeSelector = ({ onNormativeChange }: NormativeSelectorProps) => {
  const [selectedNormative, setSelectedNormative] = useState<string>("");

  const handleNormativeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as keyof typeof normatives;
    setSelectedNormative(selected);
    onNormativeChange(normatives[selected] || []);
  };

  return (
    <div className="mb-6">
      <h2
        className={`text-xl font-bold mb-4 
          ${LIGHT_MODE_COLORS.TEXT_PRIMARY} 
          ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
      >
        Selecciona la Normativa
      </h2>
      <select
        className={`w-full p-2 border border-gray-300 rounded-md 
          ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} 
          ${DARK_MODE_COLORS.INPUT_BACKGROUND} 
          ${LIGHT_MODE_COLORS.TEXT_PRIMARY} 
          ${DARK_MODE_COLORS.TEXT_PRIMARY} 
          ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
        value={selectedNormative}
        onChange={handleNormativeChange}
      >
        <option value="" disabled>
          -- Selecciona una normativa --
        </option>
        {Object.keys(normatives).map((normative, idx) => (
          <option key={idx} value={normative}>
            {normative}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NormativeSelector;