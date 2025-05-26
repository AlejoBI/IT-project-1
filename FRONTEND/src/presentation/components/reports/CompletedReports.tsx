import React from "react";
import { useCompliance } from "../../hooks/useCompliance";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  DARK_MODE_COLORS,
  LIGHT_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";

ChartJS.register(ArcElement, Tooltip, Legend);

const CompletedReports = () => {
  const { selfAssessmentReport } = useCompliance();

  const completedCount =
    selfAssessmentReport?.filter((report) => report.status === "completed")
      .length || 0;

  const inProgressCount =
    selfAssessmentReport?.filter((report) => report.status === "in_progress")
      .length || 0;

  const data = {
    labels: ["Completos", "En Proceso"],
    datasets: [
      {
        data: [completedCount, inProgressCount],
        backgroundColor: ["#4CAF50", "#FF9800"],
        hoverBackgroundColor: ["#45A049", "#FB8C00"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return (
    <div
      className={`${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} ${ANIMATION_TIMINGS.TRANSITION_DURATION} rounded-xl shadow-md w-full h-full p-6`}
    >
      <h2
        className={`text-xl font-semibold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${ANIMATION_TIMINGS.TRANSITION_DURATION} mb-4`}
      >
        Estado de Autoevaluaciones
      </h2>
      {selfAssessmentReport?.length ? (
        <div className="relative w-full h-72 md:h-80">
          <Pie data={data} options={options} />
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
          No hay datos disponibles
        </p>
      )}
    </div>
  );
};

export default CompletedReports;
