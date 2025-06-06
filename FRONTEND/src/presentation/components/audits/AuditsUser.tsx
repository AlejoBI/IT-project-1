import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import Button from "../UI/Button";
import Loader from "../common/Loader";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";
import { useAudit } from "../../hooks/useAudit";
import { useAuth } from "../../hooks/useAuth";
import { fetchSelfAssessmentToAudits } from "../../../application/store/audits/auditActions";
import { SelfAssessmentToAudit } from "../../../domain/models/types/auditTypes";
import ButtonPDF from "../UI/ButtonPDF";

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

  const grouped = selfAssessmentToAudits?.reduce<
    Record<string, SelfAssessmentToAudit[]>
  >((acc, curr) => {
    const baseName = curr.regulationName.replace(/ v\d+$/, "");
    if (!acc[baseName]) acc[baseName] = [];
    acc[baseName].push(curr);
    return acc;
  }, {});

  const toggleRegulation = (name: string) => {
    setIsOpen((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  if (loading) return <Loader />;

  if (!grouped || Object.keys(grouped).length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600 dark:text-gray-300">
        No tienes evaluaciones disponibles aún.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([baseName, forms]) => (
        <div
          key={baseName}
          className={`border rounded-lg overflow-hidden ${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
        >
          <button
            onClick={() => toggleRegulation(baseName)}
            className={`w-full text-left px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
          >
            {isOpen[baseName] ? "▼" : "►"} Evaluación {baseName}
          </button>

          <div
            className={`transition-all duration-700 overflow-hidden ${
              isOpen[baseName]
                ? "max-h-[1000px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-4 py-4 space-y-3">
              {forms.map((form, index) => (
                <div
                  key={`${form.formId}-${index}`}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 p-3 rounded border border-gray-200 dark:border-[#2A4C61]"
                >
                  <span className="text-sm font-medium text-gray-800 dark:text-white w-full sm:w-1/3">
                    {form.formName}
                  </span>
                  <div className="w-full sm:w-1/3 text-right">
                    <ButtonPDF selfAssessmentId={form.id || ""} />
                  </div>
                  <div className="w-full sm:w-1/3 text-right">
                    <Button onClick={() => handleAudit(form.id || "")}>
                      Revisar
                    </Button>
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
