import React, { useEffect } from "react";
import AuditsUser from "../components/audits/AuditsUser";
import StatsOverview from "../components/audits/StatsOverview";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  GRADIENTS,
  DARK_GRADIENTS,
  ANIMATION_TIMINGS,
} from "../../shared/constants";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchUserAction } from "../../application/store/users/usersActions";
import Loader from "../components/common/Loader"; 

const AuditToUser = () => {
  const { user: AuthUser } = useAuth();
  const { user, loading } = useUser(); 
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (AuthUser?.uid) {
      dispatch(fetchUserAction(AuthUser.uid));
    }
  }, [AuthUser, dispatch]);

  if (loading) return <Loader />;

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-600 dark:text-gray-300">
        No se encontró información del usuario.
      </div>
    );
  }

  const evaluationCount = user.evaluationsCount || 0;
  const auditCount = user.auditsCount || 0;
  const evaluationsAverage =
    typeof user.evaluationsAverage === "number"
      ? `${user.evaluationsAverage.toFixed(2)}%`
      : "0%";

  return (
    <div
      className={`min-h-screen px-6 py-8 ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      <div
        className={`p-6 rounded-2xl shadow-md mb-8 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${GRADIENTS.WELCOME_BANNER} ${DARK_GRADIENTS.WELCOME_BANNER} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
      >
        <h1 className="text-3xl font-bold">Evaluaciones y Auditorías</h1>
        <p className="mt-2 text-sm opacity-90">
          Visualiza tu progreso y tareas pendientes en las auditorías.
        </p>
      </div>

      <div className="flex justify-center items-center">
        <StatsOverview
          evaluationCount={evaluationCount}
          auditCount={auditCount}
          evaluationsAverage={evaluationsAverage}
        />
      </div>

      <div className="mt-6">
        <AuditsUser />
      </div>
    </div>
  );
};

export default AuditToUser;
