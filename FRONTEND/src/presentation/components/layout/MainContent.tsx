import React from "react";
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS, ANIMATION_TIMINGS } from "../../../shared/constants";
import Breadcrumbs from "./Breadcrumbs";

const MainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={`min-w-0 flex-1 min-h-screen overflow-x-hidden rounded-lg p-4 shadow-xl ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND} transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      <Breadcrumbs />
      {children}
    </main>
  );
};

export default MainContent;
