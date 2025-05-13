import React, { useEffect } from "react";
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
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchComplianceReports } from "../../../application/store/compliance/complianceActions";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Props {
  userId: string;
}

const RegulationReport = ({ userId }: Props) => {
  const { complianceReport } = useCompliance();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!complianceReport?.length) {
      dispatch(fetchComplianceReports(userId));
    }
  }, [dispatch, userId, complianceReport?.length]);

  if (!complianceReport || complianceReport.length === 0) return;

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
        backgroundColor: "#10b981", // verde
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
      className={`${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} ${ANIMATION_TIMINGS.TRANSITION_DURATION} rounded-2xl shadow-md hover:shadow-lg transition-shadow w-full max-w-4xl mx-auto p-6`}
    >
      <h2
        className={`text-xl font-semibold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${ANIMATION_TIMINGS.TRANSITION_DURATION} mb-2`}
      >
        Comparativa de Cumplimiento por Normativa
      </h2>

      {complianceReport?.length ? (
        <div className="relative w-full h-80">
          <Bar data={chartData} options={options} />
        </div>
      ) : (
        <p className="text-gray-500 text-sm text-center">
          No hay datos disponibles
        </p>
      )}
    </div>
  );
};

export default RegulationReport;
