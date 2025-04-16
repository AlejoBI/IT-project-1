import React from "react";

const tasks = [
  { title: "Evaluar control A.5.1", priority: "Alta" },
  { title: "Completar auditoría interna", priority: "Media" },
  { title: "Subir evidencia de control A.8", priority: "Baja" },
];

const priorityColor = {
  Alta: "text-red-500",
  Media: "text-yellow-500",
  Baja: "text-green-500",
};

const PendingTasksList = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Tareas Pendientes</h3>
    <ul className="space-y-2">
      {tasks.map((task, i) => (
        <li key={i} className="flex justify-between items-center">
          <span className="text-gray-700 dark:text-gray-200">{task.title}</span>
          <span className={`text-sm font-bold ${priorityColor[task.priority as keyof typeof priorityColor]}`}>
            {task.priority}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default PendingTasksList;