import React, { useEffect, useMemo, useState } from "react";
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
import ReportActions from "../components/reports/ReportActions";
import HistoricalComparison from "../components/reports/HistoricalComparison";
import ReportSummary from "../components/reports/ReportSummary";
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS, ANIMATION_TIMINGS, UI_COLORS } from "../../shared/constants";
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
  const filteredReports = useMemo(() => complianceReport?.filter((report) => {
    const reportDate = new Date(report.createdAt).getTime();
    const afterFrom = !fromDate || reportDate >= new Date(`${fromDate}T00:00:00`).getTime();
    const beforeTo = !toDate || reportDate <= new Date(`${toDate}T23:59:59`).getTime();
    return (
      (!regulationFilter || report.regulationId === regulationFilter) &&
      (!statusFilter || report.complianceStatus === statusFilter) &&
      afterFrom &&
      beforeTo
    );
  }), [complianceReport, fromDate, regulationFilter, statusFilter, toDate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className={`flex flex-col p-6 min-h-screen ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${LIGHT_MODE_COLORS.ACCENT} ${DARK_MODE_COLORS.ACCENT}`}>Analítica</p>
          <h1 className={`text-3xl font-bold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}>Reportes de cumplimiento</h1>
        </div>
        <p className={`text-sm ${UI_COLORS.MUTED}`}>{filteredReports?.length ?? 0} reportes visibles</p>
      </header>

      {error && (
        <p role="alert" className={`mb-6 rounded-xl p-4 ${UI_COLORS.DANGER} ${UI_COLORS.DANGER_SURFACE}`}>
          No pudimos cargar los reportes: {error}
        </p>
      )}

      {hasReports ? (
        <>
          <section className={`mb-6 grid grid-cols-1 gap-4 rounded-xl border p-4 shadow-sm ${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} ${UI_COLORS.BORDER} sm:grid-cols-2 lg:grid-cols-4`}>
            <label className="text-sm font-medium">
              Regulación
              <select aria-label="Filtrar por regulación" value={regulationFilter} onChange={(event) => setRegulationFilter(event.target.value)} className={`mt-1 w-full rounded-lg border p-2 ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${UI_COLORS.BORDER} ${UI_COLORS.FOCUS}`}>
                <option value="">Todas</option>
                {Array.from(new Map((complianceReport ?? []).map((report) => [report.regulationId, report.regulationName]))).map(([id, name]) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium">
              Estado
              <select aria-label="Filtrar por estado" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className={`mt-1 w-full rounded-lg border p-2 ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${UI_COLORS.BORDER} ${UI_COLORS.FOCUS}`}>
                <option value="">Todos</option>
                <option value="Cumple">Cumple</option>
                <option value="Parcialmente Cumple">Parcialmente cumple</option>
                <option value="No Cumple">No cumple</option>
              </select>
            </label>
            <label className="text-sm font-medium">
              Desde
              <input aria-label="Filtrar desde" type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} className={`mt-1 w-full rounded-lg border p-2 ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${UI_COLORS.BORDER} ${UI_COLORS.FOCUS}`} />
            </label>
            <label className="text-sm font-medium">
              Hasta
              <input aria-label="Filtrar hasta" type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} className={`mt-1 w-full rounded-lg border p-2 ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${UI_COLORS.BORDER} ${UI_COLORS.FOCUS}`} />
            </label>
          </section>
          <ReportSummary reports={filteredReports ?? []} />
          {/* Layout responsive de 2 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <CompletedReports reports={selfAssessmentReport?.filter((report) => !regulationFilter || report.regulationId === regulationFilter)} />
            <RegulationReport reports={filteredReports} />
          </div>
          <ReportGaps reports={filteredReports ?? []} />
          <ReportActions reports={filteredReports ?? []} />
          <HistoricalComparison reports={filteredReports ?? []} />

          <section className={`mb-8 overflow-hidden rounded-2xl border shadow-sm ${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} ${UI_COLORS.BORDER}`}>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="reports-by-regulation"
              className={`flex w-full items-center justify-between px-5 py-4 text-left font-semibold transition-colors ${LIGHT_MODE_COLORS.HOVER_BG} ${DARK_MODE_COLORS.HOVER_BG} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
            >
              <span>Resultados por normativa</span><span aria-hidden="true" className="text-lg">{isOpen ? "−" : "+"}</span>
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
          <div className={`mx-auto mt-20 flex max-w-lg flex-col items-center justify-center rounded-2xl border p-10 text-center shadow-sm ${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} ${UI_COLORS.BORDER} ${UI_COLORS.MUTED}`}>
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
