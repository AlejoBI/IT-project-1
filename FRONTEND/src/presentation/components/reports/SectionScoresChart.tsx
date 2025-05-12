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
  DARK_MODE_COLORS,
  LIGHT_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Props {
  userId: string;
}

const SectionScoresChart = ({ userId }: Props) => {
  const { complianceReport, loading } = useCompliance();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!complianceReport?.length) {
      dispatch(fetchComplianceReports(userId));
    }
  }, [dispatch, userId, complianceReport?.length]);

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;

  if (!complianceReport || complianceReport.length === 0)
    return (
      <p className="text-center text-gray-500">No hay datos disponibles.</p>
    );

  return (
    <div className="space-y-8">
      {complianceReport.map((report) => {
        const chartData = {
          labels: report.sectionScores.map((s) => s.sectionTitle),
          datasets: [
            {
              label: "Cumplimiento (%)",
              data: report.sectionScores.map((s) => s.score),
              backgroundColor: "#3b82f6", // color base de cumplimiento (azul)
              borderRadius: 4,
              barThickness: 50,
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
            key={report.regulationId}
            className={`${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} ${ANIMATION_TIMINGS.TRANSITION_DURATION} p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow`}
          >
            <h3
              className={`text-xl font-semibold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${ANIMATION_TIMINGS.TRANSITION_DURATION} mb-2`}
            >
              {report.regulationName}
            </h3>
            <p
              className={`text-sm ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${ANIMATION_TIMINGS.TRANSITION_DURATION} mb-4`}
            >
              Estado de cumplimiento:{" "}
              <span className="font-medium text-blue-600 dark:text-blue-400">
                {report.complianceStatus}
              </span>
            </p>

            <div className="h-64">
              <Bar data={chartData} options={options} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SectionScoresChart;
