import React from "react";
import { Link, useLocation } from "react-router-dom";

const labels: Record<string, string> = {
  about: "Sobre nosotros",
  contact: "Contacto",
  "privacy-policies": "Políticas de privacidad",
  audits: "Auditorías",
  "audit-list": "Lista de auditorías",
  "audit-form": "Formulario de auditoría",
  "audit-user": "Auditoría asignada",
  "audit-report": "Informe de auditoría",
  "self-assessments": "Autoevaluaciones",
  reports: "Reportes",
  dashboard: "Panel de administración",
  evaluation: "Evaluación",
};

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0 || pathname === "/login" || pathname === "/recover-password") {
    return null;
  }

  return (
    <nav aria-label="Migas de pan" className="mb-6 overflow-x-auto">
      <ol className="flex min-w-max items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        <li>
          <Link
            to="/"
            className="rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:underline"
          >
            Inicio
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isCurrent = index === segments.length - 1;
          const label = labels[segment] ?? (segment.length > 20 ? "Detalle" : segment);

          return (
            <li key={href} className="flex items-center gap-2">
              <span aria-hidden="true">/</span>
              {isCurrent ? (
                <span aria-current="page" className="font-medium text-gray-900 dark:text-white">
                  {label}
                </span>
              ) : (
                <Link
                  to={href}
                  className="rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:underline"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
