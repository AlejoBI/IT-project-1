import React from "react";
import { useCompliance } from "../../hooks/useCompliance";
import { SelfAssessmentReport } from "../../../domain/models/types/complianceTypes";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { DARK_MODE_COLORS, LIGHT_MODE_COLORS, ANIMATION_TIMINGS, UI_COLORS } from "../../../shared/constants";
import { useDarkMode } from "../../hooks/useDarkMode";

ChartJS.register(ArcElement, Tooltip, Legend);

const CompletedReports = ({ reports }: { reports?: SelfAssessmentReport[] }) => {
  const { selfAssessmentReport } = useCompliance();
  const isDark = useDarkMode();
  const source = reports ?? selfAssessmentReport;

  const completedCount =
    source?.filter((report) => report.status === "completed").length || 0;

  const inProgressCount =
    source?.filter((report) => report.status === "in_progress").length || 0;

  const data = {
    labels: ["Completos", "En Proceso"],
    datasets: [
      {
        data: [completedCount, inProgressCount],
        backgroundColor: isDark ? ["#61A0B9", "#E8C477"] : ["#729CAC", "#9A6A24"],
        hoverBackgroundColor: isDark ? ["#8CCBE2", "#F0D99A"] : ["#36697C", "#7A5219"],
        borderColor: isDark ? "#1A2B3A" : "#FFFFFF",
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
          labels: { color: isDark ? "#E6EDF3" : "#1F2937" },
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
        Estado de Autoevaluaciones
      </h2>
      {source?.length ? (
        <div className="relative w-full h-72 md:h-80">
          <Pie data={data} options={options} />
        </div>
      ) : (
        <p className={`text-center text-sm ${UI_COLORS.MUTED}`}>
          No hay datos disponibles
        </p>
      )}
    </div>
  );
};

export default CompletedReports;
