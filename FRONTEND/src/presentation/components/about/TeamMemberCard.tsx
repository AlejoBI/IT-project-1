import React from "react";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";

interface Props {
  image: string;
  name: string;
  role: string;
}

const TeamMemberCard: React.FC<Props> = ({ name, role, image }) => {
  return (
    <div
      className={`rounded-xl p-4 text-center shadow-md transition-all ${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      {/* Aquí puedes colocar una imagen de perfil */}
      <div className="w-20 h-20 mx-auto rounded-full bg-gray-300 dark:bg-gray-600 mb-4 overflow-hidden">
        {/* Reemplaza esto por una imagen real si deseas */}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <h4
        className={`text-lg font-medium ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
      >
        {name}
      </h4>
      <p
        className={`${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
      >
        {role}
      </p>
    </div>
  );
};

export default TeamMemberCard;
