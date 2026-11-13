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
import { DARK_MODE_COLORS, LIGHT_MODE_COLORS, ANIMATION_TIMINGS } from "../../../shared/constants";
import { UI_COLORS } from "../../../shared/constants";
import { useDarkMode } from "../../hooks/useDarkMode";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Props {
  userId: string;
}

const SectionScoresChart = ({ userId }: Props) => {
  const { complianceReport, loading } = useCompliance();
  const dispatch = useAppDispatch();
  const isDark = useDarkMode();

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

  if (loading) return <p className={`text-center ${UI_COLORS.MUTED}`}>Cargando...</p>;

  if (!complianceReport || complianceReport.length === 0)
    return <p className={`text-center ${UI_COLORS.MUTED}`}>No hay datos disponibles.</p>;

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
        reports?.forEach((r) => r.sectionScores.forEach((s) => allSectionsSet.add(s.sectionTitle)));
        const allSections = Array.from(allSectionsSet);

        const datasets = reports?.map((report, index) => ({
          label: `Evaluación ${index + 1}`,
          data: allSections.map((sectionTitle) => {
            const found = report.sectionScores.find((s) => s.sectionTitle === sectionTitle);
            return found ? found.score : null;
          }),
           borderColor: isDark ? `hsl(${(index * 60) % 360}, 65%, 68%)` : `hsl(${(index * 60) % 360}, 60%, 42%)`,
           backgroundColor: isDark ? `hsla(${(index * 60) % 360}, 65%, 68%, 0.14)` : `hsla(${(index * 60) % 360}, 60%, 42%, 0.1)`,
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
               ticks: { stepSize: 20, color: isDark ? "#E6EDF3" : "#1F2937" },
               grid: { color: isDark ? "#2A4C61" : "#E5EDF0" },
            },
            x: {
              grid: { display: false },
            },
          },
          plugins: {
            legend: {
              position: "top" as const,
              labels: {
                 color: isDark ? "#E6EDF3" : "#1F2937",
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
             className={`${UI_COLORS.SURFACE} ${UI_COLORS.BORDER} ${ANIMATION_TIMINGS.TRANSITION_DURATION} rounded-2xl border p-4 shadow-sm transition-shadow hover:shadow-lg sm:p-6`}
          >
            <h3
              className={`text-xl font-semibold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${ANIMATION_TIMINGS.TRANSITION_DURATION} mb-2`}
            >
              {regulationName}
            </h3>

            <p className="sr-only">
              Evolución por sección: {reports
                ?.flatMap((report) =>
                  report.sectionScores.map((score) => `${score.sectionTitle} ${score.score}%`)
                )
                .join(", ")}.
            </p>
            <div className="overflow-x-auto" role="img" aria-label={`Evolución de ${regulationName}`}>
              <div className="min-h-64 min-w-[min(100%,600px)] sm:min-h-80">
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
