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

      {!user?.emailVerified && (
        <Notification
          message="Por favor, verifica tu dirección de correo electrónico."
          type="warning"
        />
      )}

      {loading && <Loader />}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {regulations?.map((regulation) => (
          <div
            key={regulation.id}
            onClick={() => handleNavigate(regulation.id)}
            className="cursor-pointer border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {regulation.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {regulation.description || "Sin descripción"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Compliance;
