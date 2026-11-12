import React from "react";
import logo from "../../../../assets/img/ISOlytics.webp";
import DarkModeToggle from "../../../../presentation/components/common/DarkModeToggle";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../../shared/constants";

const Header = ({
  toggleSidebar,
  isSidebarOpen,
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}) => {
  return (
    <header
      className={`${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND} shadow-md transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      <div className="container mx-auto flex items-center justify-between p-5">
        {/* Botón para alternar el Sidebar */}
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          aria-controls="primary-navigation"
          aria-expanded={isSidebarOpen}
          className={`${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} focus:outline-none`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transition-color ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Logo */}
        <a href="/" aria-label="Ir al inicio de ISOlytics">
          <div className="flex items-center cursor-pointer">
            <img
              src={logo}
              alt="ByteForge Logo"
              className={`h-10 w-10 rounded-full  ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
            />
            <span
              className={`ml-2 text-xl font-bold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
            >
              ISOlytics
            </span>
          </div>
        </a>
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;
