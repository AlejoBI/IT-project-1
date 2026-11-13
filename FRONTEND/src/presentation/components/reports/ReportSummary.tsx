import React, { useMemo } from "react";
import { ComplianceReport } from "../../../domain/models/types/complianceTypes";
import { DARK_MODE_COLORS, LIGHT_MODE_COLORS, UI_COLORS } from "../../../shared/constants";

const ReportSummary = ({ reports }: { reports: ComplianceReport[] }) => {
  const summary = useMemo(() => {
    const totalScore = reports.reduce((sum, report) => sum + report.totalScore, 0);
    const gaps = reports.reduce(
      (count, report) => count + report.sectionScores.filter((section) => section.score < 80).length,
      0
    );
    const compliant = reports.filter((report) => report.complianceStatus === "Cumple").length;
    return {
      average: reports.length ? Math.round((totalScore / reports.length) * 10) / 10 : 0,
      compliant,
      gaps,
    };
  }, [reports]);

  if (reports.length === 0) return null;

  const cards = [
    { label: "Puntaje promedio", value: `${summary.average}%`, tone: `${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT}` },
    { label: "Evaluaciones que cumplen", value: `${summary.compliant}/${reports.length}`, tone: UI_COLORS.SUCCESS_SURFACE },
    { label: "Brechas detectadas", value: summary.gaps, tone: UI_COLORS.WARNING_SURFACE },
  ];

  return (
    <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3" aria-label="Resumen de salud de cumplimiento">
      {cards.map((card) => (
        <div key={card.label} className={`rounded-xl border p-5 shadow-sm ${UI_COLORS.BORDER} ${card.tone}`}>
          <p className={`text-sm font-medium ${UI_COLORS.MUTED}`}>{card.label}</p>
          <p className={`mt-2 text-3xl font-bold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}>{card.value}</p>
        </div>
      ))}
    </section>
  );
};

export default ReportSummary;
