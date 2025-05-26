import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import Button from "../components/UI/Button";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../shared/constants";
import Loader from "../components/common/Loader";
import { useAudit } from "../hooks/useAudit";
import { fetchSelfAssessmentToAudits } from "../../application/store/audits/auditActions";
import { SelfAssessmentToAudit } from "../../domain/models/types/auditTypes";

const AuditListPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { selfAssessmentToAudits, loading } = useAudit();

  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (userId) {
      dispatch(fetchSelfAssessmentToAudits(userId));
    }
  }, [userId, dispatch]);

  const handleAudit = (selfAssessmentId: string) => {
    navigate(`/audit-form/${selfAssessmentId}`, { state: { userId } });
  };

  const handleBack = () => {
    navigate("/audits");
  };

  // Agrupar por nombre base de regulación (sin versión)
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

  return (
    <div className="p-6">
      <div className="mb-4">
        <button
          onClick={handleBack}
          className={`${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${LIGHT_MODE_COLORS.TEXT_PRIMARY_HOVER} ${DARK_MODE_COLORS.TEXT_PRIMARY_HOVER} ${ANIMATION_TIMINGS.TRANSITION_DURATION} flex items-center`}
        >
          <svg
            className="h-6 w-6 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver
        </button>
      </div>

      <div className="flex flex-col items-center mb-6 text-center">
        <h1
          className={`text-2xl sm:text-3xl font-bold mb-2 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
        >
          Evaluaciones del usuario
        </h1>
        <p
          className={`text-sm sm:text-base mb-6 ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
        >
          Aquí puedes ver todas las evaluaciones asociadas al usuario
          seleccionado. Haz clic en una regulación para ver los formularios
          disponibles y comenzar la auditoría.
        </p>
      </div>

      {Object.entries(grouped ?? {}).map(([baseName, forms]) => (
        <div
          key={baseName}
          className={`mb-6 border rounded-lg overflow-hidden ${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
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
            <div className="px-4 py-4 space-y-2">
              {forms.map((form, index) => (
                <div
                  key={`${form.formId}-${index}`}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded border border-gray-200 dark:border-[#2A4C61]"
                >
                  <span className="sm:w-1/3 text-gray-800 dark:text-white font-medium">
                    {form.formName}
                  </span>
                  <span className="sm:w-1/3 text-center text-gray-700 dark:text-gray-300">
                    {form.auditStatus === "sin_auditar"
                      ? "Sin auditar"
                      : form.auditStatus === "en_proceso"
                      ? "En proceso"
                      : form.auditStatus === "completado"
                      ? "Completado"
                      : ""}
                  </span>
                  <div className="sm:w-1/3 text-center sm:text-right">
                    <Button onClick={() => handleAudit(form.id || "")}>
                      Auditar
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
