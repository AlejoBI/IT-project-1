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
import ReportGaps from "../components/reports/ReportGaps";
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS, ANIMATION_TIMINGS } from "../../shared/constants";
import Loader from "../components/common/Loader";

const Reports = () => {
  const dispatch = useAppDispatch();
  const { loading } = useRegulation();
  const { user } = useAuth();
  const { selfAssessmentReport, complianceReport, error } = useCompliance();
  const [isOpen, setIsOpen] = useState(false);
  const [regulationFilter, setRegulationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    if (!user?.uid) return;
    dispatch(fetchRegulationsAction());
    dispatch(fetchSelfAssessmentReport(user.uid));
    dispatch(fetchComplianceReports(user.uid));
  }, [dispatch, user?.uid]);

  const hasReports = (selfAssessmentReport?.length ?? 0) > 0 || (complianceReport?.length ?? 0) > 0;
  const filteredReports = complianceReport?.filter((report) => {
    const reportDate = new Date(report.createdAt).getTime();
    const afterFrom = !fromDate || reportDate >= new Date(`${fromDate}T00:00:00`).getTime();
    const beforeTo = !toDate || reportDate <= new Date(`${toDate}T23:59:59`).getTime();
    return (
      (!regulationFilter || report.regulationId === regulationFilter) &&
      (!statusFilter || report.complianceStatus === statusFilter) &&
      afterFrom &&
      beforeTo
    );
  });

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

      {error && (
        <p role="alert" className="mb-6 rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-950 dark:text-red-200">
          No pudimos cargar los reportes: {error}
        </p>
      )}

      {hasReports ? (
        <>
          <section className="mb-6 grid grid-cols-1 gap-4 rounded-xl border p-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-sm font-medium">
              Regulación
              <select value={regulationFilter} onChange={(event) => setRegulationFilter(event.target.value)} className="mt-1 w-full rounded border p-2">
                <option value="">Todas</option>
                {Array.from(new Map((complianceReport ?? []).map((report) => [report.regulationId, report.regulationName]))).map(([id, name]) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium">
              Estado
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="mt-1 w-full rounded border p-2">
                <option value="">Todos</option>
                <option value="Cumple">Cumple</option>
                <option value="Parcialmente Cumple">Parcialmente cumple</option>
                <option value="No Cumple">No cumple</option>
              </select>
            </label>
            <label className="text-sm font-medium">
              Desde
              <input type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} className="mt-1 w-full rounded border p-2" />
            </label>
            <label className="text-sm font-medium">
              Hasta
              <input type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} className="mt-1 w-full rounded border p-2" />
            </label>
          </section>
          {/* Layout responsive de 2 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <CompletedReports reports={selfAssessmentReport?.filter((report) => !regulationFilter || report.regulationId === regulationFilter)} />
            <RegulationReport reports={filteredReports} />
          </div>
          <ReportGaps reports={filteredReports ?? []} />

          <section className="mb-8 border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="reports-by-regulation"
              className={`w-full text-left px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-1000 font-semibold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
            >
              {isOpen ? "▼" : "►"} Resultados por Normativa
            </button>

            <div
              id="reports-by-regulation"
              className={`transition-all duration-1000 overflow-hidden ${
                isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {isOpen && (
                <div className="px-4 py-6">
                  <p
                    className={`text-sm mb-4 ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
                  >
                    Visualiza el nivel de cumplimiento por sección según cada estándar.
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
            Completa al menos una autoevaluación para ver tus reportes de cumplimiento.
          </p>
        </div>
      )}
    </div>
  );
};

export default Reports;
