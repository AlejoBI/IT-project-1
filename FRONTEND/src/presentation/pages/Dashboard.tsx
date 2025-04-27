import React, { useState } from "react";
import UserManagement from "../components/dashboard/UserManagement";
import StandardManagement from "../components/dashboard/StandardManagement";

import { LIGHT_MODE_COLORS, DARK_MODE_COLORS } from "../../shared/constants";

import ButtonGradient from "../components/UI/ButtonGradient";

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState<
    "user" | "standard" | null
  >(null);

  return (
    <div className="flex flex-col gap-6 p-4 min-h-screen">
      <h1
        className={`text-2xl font-bold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
      >
        Panel de Administración
      </h1>

      {/* Menú de navegación */}
      <div className="flex flex-wrap gap-4 mb-6">
        <ButtonGradient
          onClick={() => setSelectedSection("user")}
          children="Gestión de Usuarios"
          type="button"
        />
        <ButtonGradient
          onClick={() => setSelectedSection("standard")}
          children="Gestión de Normativas"
          type="button"
        />
      </div>

      {/* Secciones condicionales */}
      {selectedSection === "user" && <UserManagement />}
      {selectedSection === "standard" && <StandardManagement />}

      {/* Mensaje inicial */}
      {!selectedSection && (
        <div
          className={`p-4 text-center ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
        >
          Selecciona una opción del menú para gestionar usuarios y roles, o
          normativas.
        </div>
      )}
    </div>
  );
};

export default Dashboard;