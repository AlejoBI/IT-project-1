import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { logoutUser } from "../../../../application/store/auth/authActions";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../../shared/constants";

const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const logout = () => dispatch(logoutUser());

  // Determinar la ruta de "Auditorías" según el rol del usuario
  const getAuditsHref = () => {
    if (user?.role === "auditor") return "/audits";
    if (user?.role === "standard_user") return "/audit-user";
    return undefined;
  };

  const navigation_all = [
    "Inicio",
    "Iniciar Sesión",
    "Sobre Nosotros",
    "Contactanos",
    "Politicas de Privacidad",
  ];

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Sobre Nosotros", href: "/about" },
    { name: "Contactanos", href: "/contact" },
    { name: "Politicas de Privacidad", href: "/privacy-policies" },
    { name: "Autoevaluaciones", href: "/self-assessments" },
    // Solo agregar "Auditorías" si el usuario es auditor o standard_user
    ...(user?.role === "auditor" || user?.role === "standard_user"
      ? [{ name: "Auditorías", href: getAuditsHref() }]
      : []),
    { name: "Reportes", href: "/reports" },
    { name: "Panel de Administración", href: "/dashboard" },
    { name: "Iniciar Sesión", href: "/login" },
    { name: "Cerrar Sesión", action: logout },
  ];

  const filteredNavigation = navigation.filter((item) => {
    if (!user || !isAuthenticated) return navigation_all.includes(item.name);
    if (item.name === "Iniciar Sesión" && isAuthenticated) return false;
    if (item.name === "Panel de Administración" && !isAuthenticated)
      return false;
    if (item.name === "Cerrar Sesión" && !isAuthenticated) return false;
    if (item.name === "Panel de Administración" && user?.role !== "admin")
      return false;
    if (item.name === "Auditorías" && user?.role == "admin") return false;
    if (item.name === "Reportes" && user?.role !== "standard_user")
      return false;
    if (item.name === "Autoevaluaciones" && user?.role !== "standard_user")
      return false;
    return true;
  });

  const handleNavigation = (href?: string, action?: () => void) => {
    if (action) {
      action();
    } else if (href) {
      navigate(href);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <aside
      className={`fixed inset-0 md:relative md:w-64 rounded-md shadow-xl mr-4 ${
        LIGHT_MODE_COLORS.SIDEBAR_BG
      } ${DARK_MODE_COLORS.SIDEBAR_BG} z-50 transition-colors ${
        ANIMATION_TIMINGS.TRANSITION_DURATION
      }  ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      <div className="p-6">
        {/* Botón para cerrar el Sidebar en móviles */}
        <button
          onClick={onClose}
          className={`${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} focus:outline-none float-right transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2
          className={`text-lg font-bold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
        >
          Menú
        </h2>
        <nav className="mt-4">
          {filteredNavigation.map((item) => {
            if ("action" in item) {
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(undefined, item.action)}
                  className={`block w-full text-left py-2 px-4 font-bold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${LIGHT_MODE_COLORS.HOVER_BG} ${DARK_MODE_COLORS.HOVER_BG} transition-all ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
                >
                  {item.name}
                </button>
              );
            } else {
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.href);
                  }}
                  className={`${
                    location.pathname === item.href
                      ? `${LIGHT_MODE_COLORS.ACCENT} ${DARK_MODE_COLORS.ACCENT} underline`
                      : `${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`
                  } block w-full text-left py-2 px-4 ${
                    LIGHT_MODE_COLORS.HOVER_BG
                  } ${DARK_MODE_COLORS.HOVER_BG} transition-colors ${
                    ANIMATION_TIMINGS.TRANSITION_DURATION
                  } font-medium`}
                >
                  {item.name}
                </a>
              );
            }
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
