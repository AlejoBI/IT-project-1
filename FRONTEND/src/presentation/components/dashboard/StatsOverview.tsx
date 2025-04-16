import React from "react";
import StatsCard from "./StatsCard";

const stats = [
  { title: "Cumplimiento Total", value: 76, description: "Porcentaje general", color: "bg-indigo-600" },
  { title: "Tareas Pendientes", value: 5, description: "Tareas de auditoría", color: "bg-red-500" },
  { title: "Controles Implementados", value: 42, description: "De 60 controles", color: "bg-green-600" },
];

const StatsOverview = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {stats.map((s, i) => (
      <StatsCard key={i} title={s.title} value={s.value} description={s.description} color={s.color} />
    ))}
  </div>
);

export default StatsOverview;
