import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Notification from "../components/common/Notification";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useRegulation } from "../hooks/useRegulation";
import { fetchRegulationsAction } from "../../application/store/regulations/regulationsActions";
import { clearComplianceState } from "../../application/store/compliance/complianceSlice";
import { clearForms } from "../../application/store/evaluationForm/evaluationFormSlice";
import Loader from "../components/common/Loader";
import { BookOpen, ChevronRight, Info } from "lucide-react";
import { DARK_MODE_COLORS, LIGHT_MODE_COLORS, UI_COLORS } from "../../shared/constants";

const Compliance = () => {
  const { user, isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { regulations, loading, error } = useRegulation();

  useEffect(() => {
    dispatch(clearComplianceState());
    dispatch(clearForms());
    dispatch(fetchRegulationsAction());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <p className={`p-6 ${UI_COLORS.MUTED}`}>Debes iniciar sesión para acceder a esta página.</p>;
  }

  const handleNavigate = (regulationId: string) => {
    navigate(`/evaluation/${regulationId}`);
  };

  return (
    <div className={`min-h-screen p-4 sm:p-6 ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND}`}>
      <h1 className={`mb-2 flex items-center justify-center gap-2 text-center text-3xl font-bold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}>
        <BookOpen className={`${LIGHT_MODE_COLORS.ACCENT} ${DARK_MODE_COLORS.ACCENT}`} /> Evaluación normativa
      </h1>

      <aside
        role="note"
        className={`mx-auto mb-6 flex max-w-3xl gap-3 rounded-2xl border p-4 text-sm ${UI_COLORS.TABLE_HEADER} ${UI_COLORS.BORDER} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
      >
        <Info className="mt-0.5 shrink-0" size={19} /><div><h2 className="font-semibold">¿Cómo usar esta sección?</h2>
        <p className="mt-1">
          Selecciona una normativa y responde cada sección con la información disponible de tu
          organización.
        </p></div>
        <p className="mt-1">
          El resultado es una guía para identificar brechas; no sustituye una asesoría legal ni una
          certificación.
        </p>
      </aside>

      {!user?.emailVerified && (
        <Notification
          message="Por favor, verifica tu dirección de correo electrónico."
          type="warning"
        />
      )}

      {loading && <Loader />}
      {error && (
        <p
          role="alert"
          className={`mx-auto mt-6 max-w-2xl rounded-xl border p-4 text-center ${UI_COLORS.DANGER} ${UI_COLORS.DANGER_SURFACE}`}
        >
          {error}
        </p>
      )}

      {!loading && !error && regulations?.length === 0 && (
        <div className={`mx-auto mt-8 max-w-2xl rounded-2xl border border-dashed p-8 text-center ${UI_COLORS.BORDER} ${UI_COLORS.SURFACE}`}>
          <h2 className={`text-xl font-semibold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}>
            No hay normativas disponibles
          </h2>
          <p className={`mt-2 ${UI_COLORS.MUTED}`}>
            Cuando una normativa esté disponible, aparecerá aquí para iniciar una evaluación.
          </p>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {regulations?.map((regulation) => (
          <button
            type="button"
            key={regulation.id}
            onClick={() => handleNavigate(regulation.id)}
            className={`group cursor-pointer rounded-2xl border p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#729CAC]/40 ${UI_COLORS.SURFACE} ${UI_COLORS.BORDER}`}
          >
            <h2 className={`flex items-center justify-between text-xl font-semibold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}>
              {regulation.name}
              <ChevronRight size={19} className={`transition-transform group-hover:translate-x-1 ${LIGHT_MODE_COLORS.ACCENT} ${DARK_MODE_COLORS.ACCENT}`} />
            </h2>
            <p className={`mt-2 text-sm ${UI_COLORS.MUTED}`}>
              {regulation.description || "Sin descripción"}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Compliance;
