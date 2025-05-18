import React, { useEffect, useState } from "react";
import { useCompliance } from "../../hooks/useCompliance";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchSelfAssessmentByAssessmentId } from "../../../application/store/compliance/complianceActions";
import { clearComplianceState } from "../../../application/store/compliance/complianceSlice";
import { createOrUpdateAudit } from "../../../application/store/audits/auditActions";
import { Audit } from "../../../domain/models/types/auditTypes";
import AuditSectionSidebar from "./AuditSectionSidebar";
import AuditSectionContent from "./AuditSectionContent";
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS } from "../../../shared/constants";
import Button from "../UI/Button";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";

const AuditSectionContainer = ({
  selfAssessmentId,
}: {
  selfAssessmentId: string;
}) => {
  const dispatch = useAppDispatch();
  const { selfAssessmentToAudit } = useCompliance();
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  );
  const { register, handleSubmit, reset } = useForm<{
    auditComment: string;
    complianceStatus: string;
  }>({
    defaultValues: {
      auditComment: "",
      complianceStatus: "",
    },
  });
  const { user } = useAuth();
  const auditorId = user?.uid || "";

  useEffect(() => {
    if (selectedSectionId && selfAssessmentToAudit) {
      reset({
        auditComment: "",
        complianceStatus: "",
      });
    }
  }, [selectedSectionId, selfAssessmentToAudit, reset]);

  useEffect(() => {
    dispatch(fetchSelfAssessmentByAssessmentId(selfAssessmentId));
    return () => {
      dispatch(clearComplianceState());
    };
  }, [dispatch, selfAssessmentId]);

  const sectionAnswers = selfAssessmentToAudit?.answers || [];

  const uniqueSections = Array.from(
    new Map(sectionAnswers.map((item) => [item.sectionId, item])).values()
  );

  const handleSaveAudit = (data: {
    auditComment: string;
    complianceStatus: string;
  }) => {
    if (!selectedSectionId) return;

    const section = uniqueSections.find(
      (s) => s.sectionId === selectedSectionId
    );
    if (!section) return;

    const audit: Audit = {
      auditorId,
      selfAssessmentId,
      sectionAudit: {
        sectionId: section.sectionId,
        sectionTitle: section.sectionTitle,
        status: data.complianceStatus,
        observation: data.auditComment,
      },
    };
    dispatch(createOrUpdateAudit(audit));
  };

  return (
    <div>
      <div className="flex gap-6">
        <AuditSectionSidebar
          sections={uniqueSections.map(({ sectionId, sectionTitle }) => ({
            sectionId,
            sectionTitle,
          }))}
          selectedSectionId={selectedSectionId}
          onSelect={setSelectedSectionId}
        />
        <AuditSectionContent
          sectionAnswers={sectionAnswers}
          selectedSectionId={selectedSectionId}
        />
      </div>
      {selectedSectionId && (
        <div
          className={`${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} p-6 rounded-2xl shadow`}
        >
          <h3
            className={`text-xl font-semibold mb-4 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
          >
            Comentarios de Auditoría y Cumplimiento
          </h3>
          <form onSubmit={handleSubmit(handleSaveAudit)} className="space-y-4">
            <div>
              <label
                className={`block mb-1 text-sm font-medium ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
              >
                Comentario de Auditoría
              </label>
              <textarea
                {...register("auditComment")}
                rows={4}
                className={`w-full p-2 border border-gray-300 dark:border-[#2A4C61] rounded-md ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
              />
            </div>

            <div>
              <label
                className={`block mb-1 text-sm font-medium ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
              >
                Estado de Cumplimiento
              </label>
              <select
                {...register("complianceStatus")}
                className={`w-full p-2 border border-gray-300 dark:border-[#2A4C61] rounded-md ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
              >
                <option value="">Seleccione un estado</option>
                <option value="Cumple">Cumple</option>
                <option value="No cumple">No Cumple</option>
                <option value="Parcialmente cumple">Cumple Parcialmente</option>
              </select>
            </div>
            <div className="flex justify-end p-0">
              <Button
                type="submit"
                children="Guardar Sección de Cumplimiento"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AuditSectionContainer;
