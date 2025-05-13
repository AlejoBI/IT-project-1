import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
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

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

interface Props {
  userId: string;
}

const SectionScoresChart = ({ userId }: Props) => {
  const { complianceReport, loading } = useCompliance();
  const dispatch = useAppDispatch();

  interface GroupedReport {
    regulationId: string;
    regulationName: string;
    reports: typeof complianceReport;
  }

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

  // Agrupar reportes por regulationId
  const groupedByRegulation: Record<string, GroupedReport> = {};
  complianceReport.forEach((report) => {
    const { regulationId } = report;
    if (!groupedByRegulation[regulationId]) {
      groupedByRegulation[regulationId] = {
        regulationId,
        regulationName: report.regulationName,
        reports: [],
      };
    }
    groupedByRegulation[regulationId]?.reports?.push(report);
  });

  const groupedReportsArray = Object.values(groupedByRegulation);

  return (
    <div className="max-h-[80vh] overflow-y-auto pr-2 space-y-8 pb-10">
      {groupedReportsArray.map(({ regulationId, regulationName, reports }) => {
        const allSectionsSet = new Set<string>();
        reports?.forEach((r) =>
          r.sectionScores.forEach((s) => allSectionsSet.add(s.sectionTitle))
        );
        const allSections = Array.from(allSectionsSet);

        const datasets = reports?.map((report, index) => ({
          label: `Evaluación ${index + 1}`,
          data: allSections.map((sectionTitle) => {
            const found = report.sectionScores.find(
              (s) => s.sectionTitle === sectionTitle
            );
            return found ? found.score : null;
          }),
          borderColor: `hsl(${(index * 60) % 360}, 70%, 50%)`,
          backgroundColor: `hsla(${(index * 60) % 360}, 70%, 50%, 0.1)`,
          tension: 0.2,
        }));

        const chartData = {
          labels: allSections,
          datasets: datasets || [],
        };

        const options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: { stepSize: 20 },
              grid: { color: "#e5e7eb" },
            },
            x: {
              grid: { display: false },
            },
          },
          plugins: {
            legend: {
              position: "top" as const,
              labels: {
                color: "#4b5563",
              },
            },
            tooltip: {
              mode: "index" as const,
              intersect: false,
            },
          },
        };

        return (
          <div
            key={regulationId}
            className={`${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} ${ANIMATION_TIMINGS.TRANSITION_DURATION} p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow`}
          >
            <h3
              className={`text-xl font-semibold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${ANIMATION_TIMINGS.TRANSITION_DURATION} mb-2`}
            >
              {regulationName}
            </h3>

            <div className="overflow-x-auto">
              <div className="min-w-[600px] min-h-[20rem]">
                <Line data={chartData} options={options} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SectionScoresChart;
