import React from "react";

const activities = [
  { action: "Evaluación completada", user: "Carlos M.", date: "2025-04-10" },
  { action: "Nuevo control agregado", user: "Laura G.", date: "2025-04-09" },
  { action: "Auditoría iniciada", user: "Julián R.", date: "2025-04-07" },
];

const ActivityFeed = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Actividad Reciente</h3>
    <ul className="space-y-2">
      {activities.map((a, i) => (
        <li key={i} className="text-gray-700 dark:text-gray-200">
          <span className="font-medium">{a.user}</span> - {a.action} <span className="text-sm text-gray-400 ml-2">({a.date})</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ActivityFeed;