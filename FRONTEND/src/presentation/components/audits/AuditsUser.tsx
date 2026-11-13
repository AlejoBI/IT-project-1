import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import Button from "../UI/Button";
import Loader from "../common/Loader";
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS, ANIMATION_TIMINGS, UI_COLORS } from "../../../shared/constants";
import { useAudit } from "../../hooks/useAudit";
import { useAuth } from "../../hooks/useAuth";
import { fetchSelfAssessmentToAudits } from "../../../application/store/audits/auditActions";
import { SelfAssessmentToAudit } from "../../../domain/models/types/auditTypes";
import ButtonPDF from "../UI/ButtonPDF";
import { ChevronDown, ChevronRight, ClipboardCheck } from "lucide-react";

const AuditListPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { selfAssessmentToAudits, loading } = useAudit();

  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({});
  const userId = user?.uid || "";

  useEffect(() => {
    if (userId) {
      dispatch(fetchSelfAssessmentToAudits(userId));
    }
  }, [userId, dispatch]);

  const handleAudit = (selfAssessmentId: string) => {
    navigate(`/audit-report/${selfAssessmentId}`);
  };

  const grouped = selfAssessmentToAudits?.reduce<Record<string, SelfAssessmentToAudit[]>>(
    (acc, curr) => {
      const baseName = curr.regulationName.replace(/ v\d+$/, "");
      if (!acc[baseName]) acc[baseName] = [];
      acc[baseName].push(curr);
      return acc;
    },
    {}
  );

  const toggleRegulation = (name: string) => {
    setIsOpen((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  if (loading) return <Loader />;

  if (!grouped || Object.keys(grouped).length === 0) {
    return (
      <div className={`mx-auto mt-10 max-w-md rounded-2xl border p-8 text-center ${UI_COLORS.SURFACE} ${UI_COLORS.BORDER} ${UI_COLORS.MUTED}`}>
        No tienes evaluaciones disponibles aún.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([baseName, forms]) => (
        <div
          key={baseName}
          className={`overflow-hidden rounded-2xl border shadow-sm ${UI_COLORS.SURFACE} ${UI_COLORS.BORDER} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
        >
          <button
            onClick={() => toggleRegulation(baseName)}
            className={`flex w-full items-center justify-between px-5 py-4 text-left font-semibold ${UI_COLORS.TABLE_HEADER} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
          >
            <span className="flex items-center gap-2"><ClipboardCheck size={19} /> Evaluación {baseName}</span>
            {isOpen[baseName] ? <ChevronDown size={19} /> : <ChevronRight size={19} />}
          </button>

          <div
            className={`transition-all duration-700 overflow-hidden ${
              isOpen[baseName] ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-4 py-4 space-y-3">
              {forms.map((form, index) => (
                <div
                  key={`${form.formId}-${index}`}
                  className={`flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0 ${UI_COLORS.TABLE_ROW}`}
                >
                  <span className={`w-full text-sm font-medium sm:w-1/3 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}>
                    {form.formName}
                  </span>
                  <div className="w-full sm:w-1/3 text-right">
                    <ButtonPDF
                      selfAssessmentId={form.id || ""}
                      canDownload={Boolean(form.id && form.userId === userId)}
                    />
                  </div>
                  <div className="w-full sm:w-1/3 text-right">
                    <Button onClick={() => handleAudit(form.id || "")}>Revisar</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuditListPage;
