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
    <div className="flex min-h-screen flex-col gap-4 lg:flex-row">
      {/* Sidebar */}
      <aside
        className={`mt-6 w-full rounded-xl border-gray-300 p-4 shadow-md dark:border-gray-700 sm:p-6 lg:w-64 ${LIGHT_MODE_COLORS.SIDEBAR_BG} ${DARK_MODE_COLORS.SIDEBAR_BG}`}
      >
        <h2
          className={`text-xl font-semibold mb-6 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
        >
          Panel de Administración
        </h2>
        <nav className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => setSelectedSection("user")}
            aria-pressed={selectedSection === "user"}
            className={`text-left px-4 py-2 rounded font-medium transition-colors duration-300 ${
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
      <main className="min-w-0 flex-1 p-2 sm:p-6">
        <section aria-label="Resumen del panel" className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950">
            <p className="text-sm font-medium text-blue-700 dark:text-blue-200">Usuarios registrados</p>
            <p className="mt-2 text-3xl font-bold text-blue-950 dark:text-white">{users?.length ?? 0}</p>
            <p className="mt-1 text-sm text-blue-700 dark:text-blue-200">Gestiona sus roles y permisos.</p>
          </div>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950">
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-200">Normativas disponibles</p>
            <p className="mt-2 text-3xl font-bold text-emerald-950 dark:text-white">{regulations?.length ?? 0}</p>
            <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-200">Mantén actualizado el catálogo.</p>
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
