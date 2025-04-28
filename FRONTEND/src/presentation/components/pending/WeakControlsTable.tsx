import React from "react";

const controls = [
  { id: "A.6.1.1", score: 40 },
  { id: "A.7.2.2", score: 30 },
  { id: "A.9.4.1", score: 50 },
];

const WeakControlsTable = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Controles más débiles</h3>
    <table className="w-full text-left">
      <thead>
        <tr className="text-gray-600 dark:text-gray-300">
          <th className="py-2">Control</th>
          <th className="py-2">Resultado (%)</th>
        </tr>
      </thead>
      <tbody>
        {controls.map((c, i) => (
          <tr key={i} className="border-t border-gray-200 dark:border-gray-700">
            <td className="py-2 text-gray-700 dark:text-gray-200">{c.id}</td>
            <td className="py-2 text-gray-700 dark:text-gray-200">{c.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default WeakControlsTable;