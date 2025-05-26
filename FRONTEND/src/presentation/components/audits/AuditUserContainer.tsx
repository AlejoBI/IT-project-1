import React, { useEffect, useState } from "react";
import { useCompliance } from "../../hooks/useCompliance";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchSelfAssessmentByAssessmentId } from "../../../application/store/compliance/complianceActions";
import {
  clearComplianceState,
  clearNotificationState,
} from "../../../application/store/compliance/complianceSlice";
import AuditSidebar from "./AuditSidebar";
import AuditContent from "./AuditContent";
import AuditUserView from "./AuditUserView";
import Loader from "../common/Loader";

const AuditUserContainer = ({
  selfAssessmentId,
}: {
  selfAssessmentId: string;
}) => {
  const dispatch = useAppDispatch();
  const { selfAssessmentToAudit, loading } = useCompliance();
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchSelfAssessmentByAssessmentId(selfAssessmentId));
    return () => {
      dispatch(clearComplianceState());
      dispatch(clearNotificationState());
    };
  }, [dispatch, selfAssessmentId]);

  const sectionAnswers = selfAssessmentToAudit?.answers || [];

  const uniqueSections = Array.from(
    new Map(sectionAnswers.map((item) => [item.sectionId, item])).values()
  );

  useEffect(() => {
    if (!selectedSectionId && uniqueSections.length > 0) {
      setSelectedSectionId(uniqueSections[0].sectionId);
    }
  }, [selectedSectionId, uniqueSections]);

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6 px-4 sm:px-6 md:px-8 lg:px-10">
        <AuditSidebar
          sections={uniqueSections.map(({ sectionId, sectionTitle }) => ({
            sectionId,
            sectionTitle,
          }))}
          selectedSectionId={selectedSectionId}
          onSelect={setSelectedSectionId}
        />
        <AuditContent
          sectionAnswers={sectionAnswers}
          selectedSectionId={selectedSectionId}
        />
      </div>

      {selectedSectionId && (
        <div className="px-4 sm:px-6 md:px-8 lg:px-10">
          <AuditUserView
            selfAssessmentId={selfAssessmentId}
            sectionId={selectedSectionId}
          />
        </div>
      )}
    </div>
  );
};

export default AuditUserContainer;
