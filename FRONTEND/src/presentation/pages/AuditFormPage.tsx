import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import AuditContainer from "../components/audits/AuditContainer";
import { useAudit } from "../hooks/useAudit";
import Notification from "../components/common/Notification";
import Loader from "../components/common/Loader";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../shared/constants";

const AuditFormPage = () => {
  const { selfAssessmentId } = useParams<{ selfAssessmentId: string }>();
  const { userId } = useLocation().state as { userId: string };
  const { error, message, loading } = useAudit();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/audit-list/${userId}`);
  };

  if (loading) return <Loader />;

  return (
    <div>
      <button
        type="button"
        onClick={handleBack}
        className={`${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${LIGHT_MODE_COLORS.TEXT_PRIMARY_HOVER} ${DARK_MODE_COLORS.TEXT_PRIMARY_HOVER} ${ANIMATION_TIMINGS.TRANSITION_DURATION} flex items-center`}
        aria-label="Volver"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
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
      {error && <Notification message={error} type="error" />}
      {message && <Notification message={message} type="success" />}
      <AuditContainer selfAssessmentId={selfAssessmentId || ""} />
    </div>
  );
};

export default AuditFormPage;
