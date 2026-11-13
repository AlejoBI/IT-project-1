import React, { useEffect, useState } from "react";
import UserManagement from "../components/dashboard/UserManagement";
import StandardManagement from "../components/dashboard/StandardManagement";
import SystemHealthPanel from "../components/dashboard/SystemHealthPanel";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useUser } from "../hooks/useUser";
import { useRegulation } from "../hooks/useRegulation";
import { fetchUsersAction } from "../../application/store/users/usersActions";
import { fetchRegulationsAction } from "../../application/store/regulations/regulationsActions";

import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  GRADIENTS,
  DARK_GRADIENTS,
  UI_COLORS,
} from "../../shared/constants";

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState<"user" | "standard">("user");
  const dispatch = useAppDispatch();
  const { users } = useUser();
  const { regulations } = useRegulation();

  useEffect(() => {
    dispatch(fetchUsersAction());
    dispatch(fetchRegulationsAction());
  }, [dispatch]);

  return (
    <div className={`flex min-h-screen flex-col gap-6 p-4 sm:p-6 lg:flex-row ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND}`}>
      {/* Sidebar */}
      <aside
        className={`w-full self-start rounded-2xl border p-4 shadow-sm sm:p-6 lg:sticky lg:top-6 lg:w-72 ${LIGHT_MODE_COLORS.SIDEBAR_BG} ${DARK_MODE_COLORS.SIDEBAR_BG} ${UI_COLORS.BORDER}`}
      >
        <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.18em] ${LIGHT_MODE_COLORS.ACCENT} ${DARK_MODE_COLORS.ACCENT}`}>ISOlytics</p>
        <h2 className={`mb-6 text-2xl font-bold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}>Panel de administración</h2>
        <nav className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => setSelectedSection("user")}
            aria-pressed={selectedSection === "user"}
              className={`rounded-xl px-4 py-3 text-left font-medium transition-colors duration-300 ${
              selectedSection === "user"
                ? `${GRADIENTS.BUTTON_BG_SECONDARY} ${DARK_GRADIENTS.BUTTON_BG_SECONDARY} text-white`
                : `${LIGHT_MODE_COLORS.HOVER_BG} ${DARK_MODE_COLORS.HOVER_BG} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`
            }`}
          >
            Gestión de Usuarios
          </button>
          <button
            type="button"
            onClick={() => setSelectedSection("standard")}
            aria-pressed={selectedSection === "standard"}
              className={`rounded-xl px-4 py-3 text-left font-medium transition-colors duration-300 ${
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
      <main className="min-w-0 max-w-7xl flex-1 lg:mx-auto">
        <section aria-label="Resumen del panel" className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className={`rounded-xl border p-5 shadow-sm ${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} ${UI_COLORS.BORDER}`}>
            <p className={`text-sm font-medium ${LIGHT_MODE_COLORS.ACCENT} ${DARK_MODE_COLORS.ACCENT}`}>Usuarios registrados</p>
            <p className={`mt-2 text-3xl font-bold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}>{users?.length ?? 0}</p>
            <p className={`mt-1 text-sm ${UI_COLORS.MUTED}`}>Gestiona sus roles y permisos.</p>
          </div>
          <div className={`rounded-xl border p-5 shadow-sm ${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} ${UI_COLORS.BORDER}`}>
            <p className={`text-sm font-medium ${LIGHT_MODE_COLORS.ACCENT} ${DARK_MODE_COLORS.ACCENT}`}>Normativas disponibles</p>
            <p className={`mt-2 text-3xl font-bold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}>{regulations?.length ?? 0}</p>
            <p className={`mt-1 text-sm ${UI_COLORS.MUTED}`}>Mantén actualizado el catálogo.</p>
          </div>
        </section>
        <SystemHealthPanel />
        {selectedSection === "user" && <UserManagement />}
        {selectedSection === "standard" && <StandardManagement />}
      </main>
    </div>
  );
};

export default Dashboard;
