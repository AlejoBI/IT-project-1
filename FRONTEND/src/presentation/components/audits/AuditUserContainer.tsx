import React, { useEffect, useState } from "react";
import { useCompliance } from "../../hooks/useCompliance";
import AuditSidebar from "./AuditSidebar";
import AuditContent from "./AuditContent";
import AuditUserView from "./AuditUserView";
import Loader from "../common/Loader";

const AuditUserContainer = ({
  selfAssessmentId,
}: {
  selfAssessmentId: string;
}) => {
  const { selfAssessmentToAudit, loading } = useCompliance();
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  );

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
      <div className="flex flex-col gap-6 md:flex-row">
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
        <AuditUserView
          selfAssessmentId={selfAssessmentId}
          sectionId={selectedSectionId}
        />
      )}
    </div>
  );
};

export default AuditUserContainer;
