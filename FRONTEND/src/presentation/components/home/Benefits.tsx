import React from "react";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";

const items = [
  {
    icon: "⚙️",
    title: "Facilita evaluaciones",
    desc: "Ahorra tiempo con nuestra herramienta agilizando el proceso.",
  },
  {
    icon: "📈",
    title: "Panel de control en tiempo real",
    desc: "Visualiza métricas clave de cumplimiento.",
  },
  {
    icon: "🔔",
    title: "Alertas y notificaciones",
    desc: "Mantente al tanto de tareas pendientes.",
  },
];

const Benefits = () => (
  <section
    className={`py-16 px-4 bg-white ${DARK_MODE_COLORS.BACKGROUND} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
  >
    <div className="max-w-6xl mx-auto text-center">
      <h2
        className={`text-3xl font-bold mb-12 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
      >
        Beneficios clave
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`p-6 ${LIGHT_MODE_COLORS.SIDEBAR_BG} ${DARK_MODE_COLORS.SIDEBAR_BG} rounded-xl shadow-md ${ANIMATION_TIMINGS.TRANSITION_DURATION} hover:scale-105 transition-transform`}
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3
              className={`text-xl font-semibold mb-2 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
            >
              {item.title}
            </h3>
            <p
              className={`${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Benefits;
