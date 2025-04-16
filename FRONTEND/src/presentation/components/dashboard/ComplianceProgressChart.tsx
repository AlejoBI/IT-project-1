/*import React from "react";  
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "ISO 27001", value: 80 },
  { name: "ITIL 4", value: 45 },
  { name: "NIST", value: 65 },
];

const COLORS = ["#6366F1", "#F59E0B", "#10B981"];

const ComplianceProgressChart = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Progreso por Norma</h3>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={80}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default ComplianceProgressChart;*/