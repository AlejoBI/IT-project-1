import React from "react";
import StatsCard from "./StatsCard";

type StatsOverviewProps = {
  evaluationCount: number;
  auditCount: number;
  evaluationsAverage: string;
};

const StatsOverview: React.FC<StatsOverviewProps> = ({
  evaluationCount,
  auditCount,
  evaluationsAverage,
}) => {
  const stats = [
    {
      title: "Evaluaciones Completadas",
      value: evaluationCount,
      description: "Evaluaciones Completadas",
    },
    {
      title: "Auditorías",
      value: auditCount,
      description: "Secciones Completadas",
    },

    {
      title: "Promedio Cumplimiento de Evaluaciones",
      value: evaluationsAverage,
      description: "Evaluaciones Completadas",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          description={stat.description}
        />
      ))}
    </div>
  );
};

export default StatsOverview;
