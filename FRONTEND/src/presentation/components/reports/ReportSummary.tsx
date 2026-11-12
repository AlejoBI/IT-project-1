import React, { useMemo } from "react";
import { ComplianceReport } from "../../../domain/models/types/complianceTypes";

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
    { label: "Puntaje promedio", value: `${summary.average}%`, tone: "blue" },
    { label: "Evaluaciones que cumplen", value: `${summary.compliant}/${reports.length}`, tone: "emerald" },
    { label: "Brechas detectadas", value: summary.gaps, tone: "amber" },
  ];

  return (
    <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3" aria-label="Resumen de salud de cumplimiento">
      {cards.map((card) => (
        <div key={card.label} className={`rounded-xl border p-5 ${
          card.tone === "blue"
            ? "border-blue-100 bg-blue-50 dark:border-blue-900 dark:bg-blue-950"
            : card.tone === "emerald"
              ? "border-emerald-100 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950"
              : "border-amber-100 bg-amber-50 dark:border-amber-900 dark:bg-amber-950"
        }`}>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{card.label}</p>
          <p className="mt-2 text-3xl font-bold">{card.value}</p>
        </div>
      ))}
    </section>
  );
};

export default ReportSummary;
