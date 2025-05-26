import React, { useState } from "react";
import UserManagement from "../components/dashboard/UserManagement";
import StandardManagement from "../components/dashboard/StandardManagement";

import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  GRADIENTS,
  DARK_GRADIENTS,
} from "../../shared/constants";

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState<"user" | "standard">(
    "user"
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`w-64 mt-6 p-6 rounded-xl shadow-md ${LIGHT_MODE_COLORS.SIDEBAR_BG} ${DARK_MODE_COLORS.SIDEBAR_BG} border-gray-300 dark:border-gray-700`}
      >
        <h2
          className={`text-xl font-semibold mb-6 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
        >
          Panel de Administración
        </h2>
        <nav className="flex flex-col gap-3">
          <button
            onClick={() => setSelectedSection("user")}
            className={`text-left px-4 py-2 rounded font-medium transition-colors duration-300 ${
              selectedSection === "user"
                ? `${GRADIENTS.BUTTON_BG_SECONDARY} ${DARK_GRADIENTS.BUTTON_BG_SECONDARY} text-white`
                : `${LIGHT_MODE_COLORS.HOVER_BG} ${DARK_MODE_COLORS.HOVER_BG} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`
            }`}
          >
            Gestión de Usuarios
          </button>
          <button
            onClick={() => setSelectedSection("standard")}
            className={`text-left px-4 py-2 rounded font-medium transition-colors duration-300 ${
              selectedSection === "standard"
                ? `${GRADIENTS.BUTTON_BG_SECONDARY} ${DARK_GRADIENTS.BUTTON_BG_SECONDARY} text-white`
                : `${LIGHT_MODE_COLORS.HOVER_BG} ${DARK_MODE_COLORS.HOVER_BG} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`
            }`}
          >
            Gestión de Normativas
          </button>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6">
        {selectedSection === "user" && <UserManagement />}
        {selectedSection === "standard" && <StandardManagement />}
      </main>
    </div>
  );
};

export default Dashboard;
