import React from "react";
import { ComplianceReport } from "../../../domain/models/types/complianceTypes";
import { DARK_MODE_COLORS, LIGHT_MODE_COLORS, UI_COLORS } from "../../../shared/constants";

interface Props {
  reports: ComplianceReport[];
}

const recommendationFor = (score: number): string => {
  if (score < 60) return "Definir un plan correctivo prioritario y revisar los controles asociados.";
  return "Documentar la mejora pendiente y establecer una fecha de seguimiento.";
};

const ReportGaps = ({ reports }: Props) => {
  const gaps = reports.flatMap((report) =>
    (report.questionGaps ?? report.sectionScores.map((section) => ({
      ...section,
      questionId: section.sectionId,
      questionText: "Brecha de sección",
      subQuestionText: undefined,
    })))
      .filter((section) => section.score < 80)
      .map((section) => ({
        ...section,
        regulationName: report.regulationName,
        createdAt: report.createdAt,
      }))
  );

  return (
    <section className={`mb-8 rounded-xl border p-4 shadow-sm sm:p-6 ${UI_COLORS.SURFACE} ${UI_COLORS.BORDER}`} aria-labelledby="report-gaps-title">
      <h2 id="report-gaps-title" className={`mb-4 text-xl font-semibold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}>
        Brechas y recomendaciones
      </h2>
      {gaps.length === 0 ? (
          <p className={`text-sm ${UI_COLORS.MUTED}`}>
          No se detectaron brechas en los reportes filtrados.
        </p>
      ) : (
        <div className="overflow-x-auto">
             <table className={`min-w-[760px] w-full text-left text-sm ${UI_COLORS.TABLE_SURFACE}`}>
            <thead>
              <tr className={UI_COLORS.DIVIDER}>
                 <th className={`px-3 py-2 font-semibold ${UI_COLORS.MUTED}`}>Normativa</th>
                 <th className={`px-3 py-2 font-semibold ${UI_COLORS.MUTED}`}>Sección</th>
                 <th className={`px-3 py-2 font-semibold ${UI_COLORS.MUTED}`}>Pregunta afectada</th>
                 <th className={`px-3 py-2 font-semibold ${UI_COLORS.MUTED}`}>Puntaje</th>
                 <th className={`px-3 py-2 font-semibold ${UI_COLORS.MUTED}`}>Recomendación</th>
              </tr>
            </thead>
            <tbody>
              {gaps.map((gap, index) => (
                <tr key={`${gap.sectionId}-${gap.createdAt}-${index}`} className={`${UI_COLORS.DIVIDER} align-top`}>
                  <td className={`px-3 py-2 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}>{gap.regulationName}</td>
                  <td className={`px-3 py-2 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}>{gap.sectionTitle}</td>
                  <td className={`px-3 py-2 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}>{gap.subQuestionText || gap.questionText}</td>
                  <td className={`px-3 py-2 font-semibold ${gap.score < 60 ? UI_COLORS.DANGER : UI_COLORS.WARNING}`}>{gap.score}%</td>
                  <td className={`px-3 py-2 ${UI_COLORS.MUTED}`}>{recommendationFor(gap.score)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ReportGaps;
