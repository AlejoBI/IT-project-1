import React from "react";
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS } from "../../../shared/constants";

interface Props {
  sections: { sectionId: string; sectionTitle: string }[];
  selectedSectionId: string | null;
  onSelect: (id: string) => void;
}

const AuditSidebar = ({
  sections,
  selectedSectionId,
  onSelect,
}: Props) => {
  return (
    <aside
      className={`${LIGHT_MODE_COLORS.SIDEBAR_BG} ${DARK_MODE_COLORS.SIDEBAR_BG} w-80 mb-6 mt-4 h-screen p-4 rounded-2xl border border-gray-200 dark:border-[#2A4C61]`}
    >
      <h3
        className={`${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} text-lg font-semibold mb-4`}
      >
        Secciones
      </h3>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.sectionId}>
            <button
              onClick={() => onSelect(section.sectionId)}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                selectedSectionId === section.sectionId
                  ? `${LIGHT_MODE_COLORS.BUTTON_BG} ${DARK_MODE_COLORS.BUTTON_BG} text-white`
                  : `${LIGHT_MODE_COLORS.BACKGROUND_COMPONENT} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`
              }`}
            >
              {section.sectionTitle}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AuditSidebar;
