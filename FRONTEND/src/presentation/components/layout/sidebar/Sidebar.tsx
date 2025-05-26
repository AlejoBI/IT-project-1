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

interface NavigationItem {
  name: string;
  href?: string;
  action?: () => void;
}

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

  const getAuditsHref = () => {
    if (user?.role === "auditor") return "/audits";
    if (user?.role === "standard_user") return "/audit-user";
    return undefined;
  };

  const navigation_all: NavigationItem[] = [
    { name: "Inicio", href: "/" },
    { name: "Iniciar Sesión", href: "/login" },
    { name: "Sobre Nosotros", href: "/about" },
    { name: "Contactanos", href: "/contact" },
    { name: "Politicas de Privacidad", href: "/privacy-policies" },
  ];

  const navigation_authenticated: NavigationItem[] = [
    { name: "Inicio", href: "/" },
    { name: "Sobre Nosotros", href: "/about" },
    { name: "Contactanos", href: "/contact" },
    { name: "Politicas de Privacidad", href: "/privacy-policies" },
    { name: "Autoevaluaciones", href: "/self-assessments" },
    ...(user?.role === "auditor" || user?.role === "standard_user"
      ? [{ name: "Auditorías", href: getAuditsHref() }]
      : []),
    { name: "Reportes", href: "/reports" },
    { name: "Panel de Administración", href: "/dashboard" },
    { name: "Cerrar Sesión", action: logout },
  ];

  const navigation: NavigationItem[] = isAuthenticated
    ? navigation_authenticated
    : navigation_all;

  const filteredNavigation = navigation.filter((item) => {
    if (!isAuthenticated) return true;

    if (item.name === "Iniciar Sesión") return false;
    if (item.name === "Panel de Administración" && user?.role !== "admin")
      return false;
    if (item.name === "Cerrar Sesión" && !isAuthenticated) return false;
    if (item.name === "Auditorías" && user?.role === "admin") return false;
    if (item.name === "Reportes" && user?.role !== "standard_user")
      return false;
    if (item.name === "Autoevaluaciones" && user?.role !== "standard_user")
      return false;

    return true;
  });

  const uniqueNavigation = filteredNavigation.filter(
    (item, index, self) => index === self.findIndex((i) => i.name === item.name)
  );

  const basicItems = uniqueNavigation.filter((item) =>
    navigation_all.some(
      (nav) => nav.name === item.name && item.name !== "Iniciar Sesión"
    )
  );

  const loginLogoutItems = uniqueNavigation.filter(
    (item) => item.name === "Iniciar Sesión" || item.name === "Cerrar Sesión"
  );

  const middleItems = uniqueNavigation.filter(
    (item) =>
      !navigation_all.some((nav) => nav.name === item.name) &&
      item.name !== "Iniciar Sesión" &&
      item.name !== "Cerrar Sesión"
  );

  const handleNavigation = (href?: string, action?: () => void) => {
    if (action) {
      action();
    } else if (href) {
      navigate(href);
    }
    onClose();
  };

  if (!isOpen) return null;

  const renderItem = (item: NavigationItem) => {
    if (item.action) {
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
          } block w-full text-left py-2 px-4 ${LIGHT_MODE_COLORS.HOVER_BG} ${
            DARK_MODE_COLORS.HOVER_BG
          } transition-colors ${
            ANIMATION_TIMINGS.TRANSITION_DURATION
          } font-medium`}
        >
          {item.name}
        </a>
      );
    }
  };

  return (
    <aside
      className={`fixed inset-0 md:relative md:w-64 rounded-md shadow-xl mr-4 ${
        LIGHT_MODE_COLORS.SIDEBAR_BG
      } ${DARK_MODE_COLORS.SIDEBAR_BG} z-50 transition-colors ${
        ANIMATION_TIMINGS.TRANSITION_DURATION
      }  ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      <div className="p-6">
        <button
          onClick={onClose}
          className={`${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} focus:outline-none float-right transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
          aria-label="Cerrar menú"
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
          {basicItems.map((item) => renderItem(item))}
          {basicItems.length > 0 && (
            <hr className="my-2 border-gray-300 dark:border-gray-600" />
          )}
          {middleItems.map((item) => renderItem(item))}
          {middleItems.length > 0 && (
            <hr className="my-2 border-gray-300 dark:border-gray-600" />
          )}
          {loginLogoutItems.map((item) => renderItem(item))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
