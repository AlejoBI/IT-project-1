import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useCompliance } from "../../hooks/useCompliance";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RegulationReport = () => {
  const { complianceReport } = useCompliance();

  if (!complianceReport || complianceReport.length === 0) return null;

  const versionMap: Record<string, number> = {};
  const chartData = {
    labels: complianceReport.map((report) => {
      const { regulationId, regulationName } = report;

      if (!versionMap[regulationId]) {
        versionMap[regulationId] = 1;
      } else {
        versionMap[regulationId] += 1;
      }

      return `${regulationName} v${versionMap[regulationId]}`;
    }),
    datasets: [
      {
        label: "Puntaje total (%)",
        data: complianceReport.map((report) => report.totalScore),
        backgroundColor: "#10b981",
        borderRadius: 6,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
        grid: {
          color: "#e5e7eb",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
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
        Comparativa de Cumplimiento por Normativa
      </h2>

      <div className="relative w-full h-72 md:h-80">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RegulationReport;
