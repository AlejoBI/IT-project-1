import React, { useMemo } from "react";
import { ComplianceReport } from "../../../domain/models/types/complianceTypes";
import { DARK_MODE_COLORS, LIGHT_MODE_COLORS, UI_COLORS } from "../../../shared/constants";

interface HistoricalGroup {
  regulationId: string;
  regulationName: string;
  reports: ComplianceReport[];
}

const formatDate = (value: Date | string): string => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Fecha no disponible" : date.toLocaleDateString();
};

const HistoricalComparison = ({ reports }: { reports: ComplianceReport[] }) => {
  const groups = useMemo<HistoricalGroup[]>(() => {
    const grouped = new Map<string, HistoricalGroup>();
    reports.forEach((report) => {
      const current = grouped.get(report.regulationId) ?? {
        regulationId: report.regulationId,
        regulationName: report.regulationName,
        reports: [],
      };
      current.reports.push(report);
      grouped.set(report.regulationId, current);
    });

    return Array.from(grouped.values()).map((group) => ({
      ...group,
      reports: [...group.reports].sort(
        (left, right) => new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime()
      ),
    }));
  }, [reports]);

  if (groups.length === 0) return null;

  return (
    <section className={`mb-8 rounded-xl border p-4 shadow-sm sm:p-6 ${UI_COLORS.SURFACE} ${UI_COLORS.BORDER}`} aria-labelledby="historical-comparison-title">
      <h2 id="historical-comparison-title" className={`mb-2 text-xl font-semibold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}>
        Comparación histórica
      </h2>
      <p className={`mb-5 text-sm ${UI_COLORS.MUTED}`}>
        Evolución del puntaje total por normativa dentro de los filtros seleccionados.
      </p>
      <div className="space-y-6">
        {groups.map((group) => {
          const latest = group.reports[group.reports.length - 1];
          const previous = group.reports[group.reports.length - 2];
          const variation = previous ? latest.totalScore - previous.totalScore : null;
          return (
            <div key={group.regulationId} className="overflow-x-auto">
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className={`${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} font-semibold`}>{group.regulationName}</h3>
                <span className={`text-sm ${variation !== null && variation < 0 ? UI_COLORS.DANGER : UI_COLORS.SUCCESS}`}>
                  {variation === null
                    ? "Primera evaluación registrada"
                    : `Variación: ${variation > 0 ? "+" : ""}${variation.toFixed(1)} puntos`}
                </span>
              </div>
               <table className={`min-w-[520px] w-full text-left text-sm ${UI_COLORS.TABLE_SURFACE}`}>
                <thead>
                  <tr className={UI_COLORS.DIVIDER}>
                     <th className={`px-3 py-2 font-semibold ${UI_COLORS.MUTED}`}>Evaluación</th>
                     <th className={`px-3 py-2 font-semibold ${UI_COLORS.MUTED}`}>Estado</th>
                     <th className={`px-3 py-2 font-semibold ${UI_COLORS.MUTED}`}>Puntaje</th>
                  </tr>
                </thead>
                <tbody>
                  {group.reports.map((report) => (
                    <tr key={report.id} className={UI_COLORS.DIVIDER}>
                      <td className={`px-3 py-2 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}>{formatDate(report.createdAt)}</td>
                      <td className={`px-3 py-2 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}>{report.complianceStatus}</td>
                      <td className={`px-3 py-2 font-semibold ${report.totalScore >= 80 ? UI_COLORS.SUCCESS : report.totalScore >= 60 ? UI_COLORS.WARNING : UI_COLORS.DANGER}`}>{report.totalScore}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HistoricalComparison;
