import React, { useEffect, useState } from "react";
import { fetchRegulationsAction } from "../../application/store/regulations/regulationsActions";
import {
  fetchSelfAssessmentReport,
  fetchComplianceReports,
} from "../../application/store/compliance/complianceActions";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useRegulation } from "../hooks/useRegulation";
import { useAuth } from "../hooks/useAuth";
import { useCompliance } from "../hooks/useCompliance";
import SectionScoresChart from "../components/reports/SectionScoresChart";
import CompletedReports from "../components/reports/CompletedReports";
import RegulationReport from "../components/reports/RegulationReport";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../shared/constants";
import Loader from "../components/common/Loader";

const Reports = () => {
  const dispatch = useAppDispatch();
  const { loading } = useRegulation();
  const { user } = useAuth();
  const { selfAssessmentReport, complianceReport } = useCompliance();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;
    dispatch(fetchRegulationsAction());
    dispatch(fetchSelfAssessmentReport(user.uid));
    dispatch(fetchComplianceReports(user.uid));
  }, [dispatch, user?.uid]);

  const hasReports =
    (selfAssessmentReport?.length ?? 0) > 0 ||
    (complianceReport?.length ?? 0) > 0;

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className={`flex flex-col p-6 min-h-screen ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      <h1
        className={`text-3xl font-bold mb-6 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
      >
        Reportes de Cumplimiento
      </h1>

      {hasReports ? (
        <>
          {/* Layout responsive de 2 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <CompletedReports />
            <RegulationReport />
          </div>

          <section className="mb-8 border rounded-lg overflow-hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-full text-left px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-1000 font-semibold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
            >
              {isOpen ? "▼" : "►"} Resultados por Normativa
            </button>

            <div
              className={`transition-all duration-1000 overflow-hidden ${
                isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {isOpen && (
                <div className="px-4 py-6">
                  <p
                    className={`text-sm mb-4 ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
                  >
                    Visualiza el nivel de cumplimiento por sección según cada
                    estándar.
                  </p>
                  <SectionScoresChart userId={user?.uid || ""} />
                </div>
              )}
            </div>
          </section>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-center text-gray-500 dark:text-gray-400">
          <p className="text-lg font-medium">Aún no hay reportes generados</p>
          <p className="text-sm mt-2">
            Completa al menos una autoevaluación para ver tus reportes de
            cumplimiento.
          </p>
        </div>
      )}
    </div>
  );
};

export default Reports;
