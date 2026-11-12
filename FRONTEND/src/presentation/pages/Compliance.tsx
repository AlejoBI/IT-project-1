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
    return <p>Debes iniciar sesión para acceder a esta página.</p>;
  }

  const handleNavigate = (regulationId: string) => {
    navigate(`/evaluation/${regulationId}`);
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Evaluación Normativa
      </h1>

      <aside
        role="note"
        className="mx-auto mb-6 max-w-3xl rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100"
      >
        <h2 className="font-semibold">¿Cómo usar esta sección?</h2>
        <p className="mt-1">
          Selecciona una normativa y responde cada sección con la información disponible de tu
          organización.
        </p>
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
          className="mx-auto mt-6 max-w-2xl rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
        >
          {error}
        </p>
      )}

      {!loading && !error && regulations?.length === 0 && (
        <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            No hay normativas disponibles
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
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
            className="cursor-pointer rounded-2xl border border-gray-300 bg-white p-5 text-left shadow transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {regulation.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {regulation.description || "Sin descripción"}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Compliance;
