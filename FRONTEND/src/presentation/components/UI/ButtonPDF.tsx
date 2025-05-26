import React, { useState, useEffect, useRef } from "react";
import { pdf } from "@react-pdf/renderer";
import PDFTemplateReports from "../export-pdf/PDFTemplateReports";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchSelfAssessmentByAssessmentId } from "../../../application/store/compliance/complianceActions";
import { fetchAuditsBySelfAssessmentId } from "../../../application/store/audits/auditActions";
import { useCompliance } from "../../hooks/useCompliance";
import { useAuth } from "../../hooks/useAuth";
import { useAudit } from "../../../presentation/hooks/useAudit";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";

interface ButtonPDFProps {
  selfAssessmentId: string;
}

const ButtonPDF: React.FC<ButtonPDFProps> = ({ selfAssessmentId }) => {
  const { selfAssessmentToAudit } = useCompliance();
  const { audits } = useAudit();
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const shouldDownload = useRef(false);

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDownload = async () => {
    setLoading(true);
    shouldDownload.current = true;
    await dispatch(fetchSelfAssessmentByAssessmentId(selfAssessmentId));
    await dispatch(fetchAuditsBySelfAssessmentId(selfAssessmentId));
  };

  useEffect(() => {
    const generatePDF = async () => {
      if (shouldDownload.current && user && selfAssessmentToAudit) {
        try {
          const doc = (
            <PDFTemplateReports
              user={user}
              data={selfAssessmentToAudit}
              audits={audits ?? []}
            />
          );
          const blob = await pdf(doc).toBlob();
          downloadBlob(
            blob,
            `reporte-${user?.name ?? "usuario"}-${Date.now()}.pdf`
          );
        } catch (err) {
          console.error("Error al generar el PDF:", err);
        } finally {
          setLoading(false);
          shouldDownload.current = false;
        }
      }
    };
    generatePDF();
  }, [selfAssessmentToAudit, audits, user]);

  if (!user || !selfAssessmentId) return null;

  return (
    <button
      onClick={handleDownload}
      className={`
    ${LIGHT_MODE_COLORS.BUTTON_BG} 
    ${LIGHT_MODE_COLORS.TEXT_PRIMARY_HOVER.replace("hover:", "hover:")} 
    ${LIGHT_MODE_COLORS.BUTTON_HOVER_BG} 
    ${DARK_MODE_COLORS.BUTTON_BG} 
    ${DARK_MODE_COLORS.BUTTON_HOVER_BG} 
    ${LIGHT_MODE_COLORS.TEXT_PRIMARY} 
    px-4 py-2 rounded 
    ${ANIMATION_TIMINGS.TRANSITION_DURATION} 
    ${DARK_MODE_COLORS.TEXT_PRIMARY}
  `}
      disabled={loading}
    >
      {loading ? "Generando PDF..." : "Descargar PDF"}
    </button>
  );
};

export default ButtonPDF;
