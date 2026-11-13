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
import { ComplianceReport } from "../../../domain/models/types/complianceTypes";
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS, ANIMATION_TIMINGS, UI_COLORS } from "../../../shared/constants";
import { useDarkMode } from "../../hooks/useDarkMode";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RegulationReport = ({ reports }: { reports?: ComplianceReport[] }) => {
  const { complianceReport } = useCompliance();
  const isDark = useDarkMode();
  const source = reports ?? complianceReport;

  if (!source || source.length === 0) return null;

  const versionMap: Record<string, number> = {};
  const chartData = {
    labels: source.map((report) => {
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
        data: source.map((report) => report.totalScore),
        backgroundColor: isDark ? "#61A0B9" : "#729CAC",
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
          color: isDark ? "#E6EDF3" : "#1F2937",
        },
        grid: {
           color: isDark ? "#2A4C61" : "#E5EDF0",
        },
      },
      x: {
        ticks: { color: isDark ? "#E6EDF3" : "#1F2937" },
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
      className={`${UI_COLORS.SURFACE} ${UI_COLORS.BORDER} ${ANIMATION_TIMINGS.TRANSITION_DURATION} h-full w-full rounded-xl border p-4 shadow-sm sm:p-6`}
    >
      <h2
        className={`text-xl font-semibold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${ANIMATION_TIMINGS.TRANSITION_DURATION} mb-4`}
      >
        Comparativa de Cumplimiento por Normativa
      </h2>

      <p className="sr-only">
        Puntajes: {source
          .map((report, index) => `${chartData.labels[index]} ${report.totalScore}%`)
          .join(", ")}.
      </p>
      <div
        className="relative h-64 w-full sm:h-72 md:h-80"
        role="img"
        aria-label="Gráfico de puntajes por normativa"
      >
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RegulationReport;
