import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchSelfAssessmentByAssessmentId } from "../../../application/store/compliance/complianceActions";
import { fetchAuditsBySelfAssessmentId } from "../../../application/store/audits/auditActions";
import { useCompliance } from "../../hooks/useCompliance";
import { useAuth } from "../../hooks/useAuth";
import { useAudit } from "../../../presentation/hooks/useAudit";
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS, ANIMATION_TIMINGS } from "../../../shared/constants";

interface ButtonPDFProps {
  selfAssessmentId: string;
}

const ButtonPDF: React.FC<ButtonPDFProps> = ({ selfAssessmentId }) => {
  const { selfAssessmentToAudit } = useCompliance();
  const { audits } = useAudit();
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    setError(null);
    shouldDownload.current = true;
    try {
      await dispatch(fetchSelfAssessmentByAssessmentId(selfAssessmentId)).unwrap();
      await dispatch(fetchAuditsBySelfAssessmentId(selfAssessmentId)).unwrap();
    } catch (requestError) {
      shouldDownload.current = false;
      setLoading(false);
      setError(requestError instanceof Error ? requestError.message : "No se pudo cargar el reporte.");
    }
  };

  useEffect(() => {
    const generatePDF = async () => {
      if (shouldDownload.current && user && selfAssessmentToAudit) {
        try {
          const [{ pdf }, { default: PDFTemplateReports }] = await Promise.all([
            import("@react-pdf/renderer"),
            import("../export-pdf/PDFTemplateReports"),
          ]);
          const doc = (
            <PDFTemplateReports user={user} data={selfAssessmentToAudit} audits={audits ?? []} />
          );
          const blob = await pdf(doc).toBlob();
          downloadBlob(blob, `reporte-${user?.name ?? "usuario"}-${Date.now()}.pdf`);
        } catch (err) {
          console.error("Error al generar el PDF:", err);
          setError("No se pudo generar el PDF. Intenta nuevamente.");
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
    <div>
      <button
        type="button"
        onClick={handleDownload}
        aria-label={loading ? "Generando reporte PDF" : "Descargar reporte PDF"}
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
      {error && <p role="alert" className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default ButtonPDF;
