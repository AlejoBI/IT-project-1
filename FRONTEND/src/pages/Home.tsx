import React from "react";
import WelcomeBanner from "../components/home/WelcomeBanner";
import QuickActionCard from "../components/home/QuickActionCard";
import StatsCard from "../components/home/StatsCard";
import Notification from "../components/common/Notification";

import { useAuth } from "../hooks/useAuth";

import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../utils/constants";

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();

  // Datos para las tarjetas de acciones rápidas
  const quickActions = [
    {
      title: "Autoevaluaciones",
      description: "Realiza autoevaluaciones para medir tu cumplimiento.",
      href: "/self-assessments",
      icon: "📝",
    },
    {
      title: "Auditorías",
      description: "Accede a auditorías realizadas y pendientes.",
      href: "/audits",
      icon: "🔍",
    },
    {
      title: "Reportes",
      description: "Genera reportes detallados de cumplimiento.",
      href: "/reports",
      icon: "📊",
    },
  ];

  // Datos para las tarjetas de estadísticas
  const stats = [
    {
      title: "Progreso General",
      value: 85,
      description: "Cumplimiento normativo alcanzado.",
      color: "bg-indigo-500",
    },
    {
      title: "Tareas Pendientes",
      value: 3,
      description: "Tareas por completar en auditorías.",
      color: "bg-red-500",
    },
    {
      title: "Última Evaluación",
      value: 92,
      description: "Resultado de la última autoevaluación.",
      color: "bg-green-500",
    },
  ];

  return (
    <>
      {/* Notificaciones */}
      {isAuthenticated && !user?.emailVerified && (
        <Notification
          message="Por favor, verifica tu dirección de correo electrónico."
          type="warning"
        />
      )}
      {/* Contenido Principal */}
      <div className="flex flex-col min-h-screen p-4">
        {/* Banner de Bienvenida */}
        <WelcomeBanner
          user={user?.name}
          isAuthenticated={isAuthenticated}
          emailVerified={user?.emailVerified}
        />

        {/* Contenedor Principal */}
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          {/* Columna Izquierda: Acciones Rápidas */}
          <div className="flex-1 space-y-4">
            <h2
              className={`text-xl font-bold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
            >
              Acciones Rápidas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <QuickActionCard
                  key={index}
                  title={action.title}
                  description={action.description}
                  to={action.href}
                  icon={action.icon}
                />
              ))}
            </div>
          </div>

          {/* Columna Derecha: Estadísticas */}
          <div className="flex-1 space-y-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white transition-colors ">
              Resumen de Cumplimiento
            </h2>
            {stats.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                color={stat.color}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
