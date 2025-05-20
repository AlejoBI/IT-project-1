import React, { useEffect, useState } from "react";
import { fetchRegulationsAction } from "../../application/store/regulations/regulationsActions";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useRegulation } from "../hooks/useRegulation";
import { useAuth } from "../hooks/useAuth";
import SectionScoresChart from "../components/reports/SectionScoresChart";
import CompletedReports from "../components/reports/CompletedReports";
import RegulationReport from "../components/reports/RegulationReport";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../shared/constants";
import Loader from "../components/common/Loader";

const Reports = () => {
  const dispatch = useAppDispatch();
  const { loading } = useRegulation();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchRegulationsAction());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className={`flex flex-col p-6 min-h-screen ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      <h1
        className={`text-3xl font-bold mb-6 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
      >
        Reportes de Cumplimiento
      </h1>

      <div className="flex flex-row mb-8">
        <div className="w-1/2">
          <CompletedReports userId={user?.uid || ""} />
        </div>
        <div className="w-1/2">
          <RegulationReport userId={user?.uid || ""} />
        </div>
      </div>

      <section className="mb-8 border rounded-lg overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full text-left px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-1000 font-semibold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
        >
          {isOpen ? "▼" : "►"} Resultados por Normativa
        </button>

        <div
          className={`transition-all duration-1000 overflow-hidden ${
            isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {isOpen && (
            <div className="px-4 py-6">
              <p
                className={`text-sm mb-4 ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
              >
                Visualiza el nivel de cumplimiento por sección según cada
                estándar.
              </p>

              {loading ? (
                <p className="text-gray-500">Cargando estándares...</p>
              ) : (
                <SectionScoresChart userId={user?.uid || ""} />
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Reports;
