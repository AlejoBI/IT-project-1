import React, { useEffect, useMemo } from "react";
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS } from "../../../shared/constants";
import { useAudit } from "../../hooks/useAudit";
import { AuditSection } from "../../../domain/models/types/auditTypes";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchAuditsBySelfAssessmentId } from "../../../application/store/audits/auditActions";

interface AuditUserViewProps {
  sectionId: string;
  selfAssessmentId: string;
}

const AuditUserView = ({ sectionId, selfAssessmentId }: AuditUserViewProps) => {
  const { audits } = useAudit();
  const dispatch = useAppDispatch();

  const auditArray = useMemo(
    () => (Array.isArray(audits) ? audits : []),
    [audits]
  );

  const sectionAudit = useMemo(() => {
    const auditsForSelfAssessment = auditArray.filter(
      (a) => a.selfAssessmentId === selfAssessmentId
    );

    for (const audit of auditsForSelfAssessment) {
      const match = audit.sectionAudits.find(
        (section: AuditSection) =>
          String(section.sectionId) === String(sectionId)
      );
      if (match) {
        return {
          ...match,
          auditorId: audit.auditorId,
          auditorName: audit.auditorName, // ya viene del backend
        };
      }
    }

    return null;
  }, [auditArray, sectionId, selfAssessmentId]);

  useEffect(() => {
    if (!auditArray.length) {
      dispatch(fetchAuditsBySelfAssessmentId(selfAssessmentId));
    }
  }, [auditArray, dispatch, selfAssessmentId]);

  if (!sectionAudit)
    return (
      <div
        className={`text-gray-500 dark:text-gray-400 ${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} text-center p-6 rounded-2xl shadow mt-6`}
      >
        No hay auditoría disponible para esta sección.
      </div>
    );

  const auditorName = sectionAudit.auditorName || "Auditor";
  const auditorAvatar =
    sectionAudit.auditorAvatar ||
    `https://ui-avatars.com/api/?name=${auditorName}&background=0D8ABC&color=fff`;

  return (
    <div
      className={`${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} p-6 rounded-2xl shadow mt-6 w-full max-w-screen-lg mx-auto`}
    >
      <h3
        className={`text-xl font-semibold mb-4 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
      >
        Visualización de Auditoría de{" "}
        {sectionAudit.sectionTitle || "Sección no definida"}
      </h3>
      <p
        className={`mb-2 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
      >
        Puedes ver los comentarios y el estado de cumplimiento de la sección{" "}
        {sectionAudit.sectionTitle}
      </p>

      <div className="mt-6 flex flex-col sm:flex-row items-start gap-4">
        <img
          src={auditorAvatar}
          alt={auditorName}
          className="w-12 h-12 rounded-full object-cover border"
        />
        <div className="flex-1">
          <div
            className={`flex items-center gap-2 mb-1 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
          >
            <span className="font-semibold">{auditorName}</span>
          </div>
          <div
            className={`${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND} rounded-xl px-4 py-3 mb-2 shadow-sm`}
          >
            <p
              className={`${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
            >
              {sectionAudit.observation}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`font-medium text-sm ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
            >
              Estado:
            </span>
            <span
              className={`inline-block px-2 py-1 rounded text-white ${
                sectionAudit.status === "Cumple"
                  ? "bg-green-600"
                  : sectionAudit.status === "No Cumple"
                  ? "bg-red-600"
                  : "bg-blue-600"
              }`}
            >
              {sectionAudit.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditUserView;
