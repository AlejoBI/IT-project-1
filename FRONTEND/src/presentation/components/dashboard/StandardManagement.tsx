import React, { useState, useEffect } from "react";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  GRADIENTS,
  DARK_GRADIENTS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";
import Button from "../UI/Button";
import NormativeForm from "./NormativeForm";
import RegulationForm from "./RegulationForm";
import RegulationList from "./RegulationList";
import Notification from "../common/Notification";
import { useEvaluation } from "../../hooks/useEvaluation";
import { useRegulation } from "../../hooks/useRegulation";
import { clearNotification as clearEvaluationNotification } from "../../../application/store/evaluationForm/evaluationFormSlice";
import { clearNotification as clearRegulationNotification } from "../../../application/store/regulations/regulationsSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const StandardManagement = () => {
  const dispatch = useAppDispatch();

  const { notification: evalNotification } = useEvaluation();
  const { notification: regulationNotification } = useRegulation();

  const [selectedSection, setSelectedSection] = useState<
    "createRegulation" | "createForm" | "regulationList" | null
  >(null);

  const activeNotification = React.useMemo(() => {
    return regulationNotification.message || evalNotification.message
      ? regulationNotification.message
        ? { ...regulationNotification, source: "regulation" }
        : { ...evalNotification, source: "evaluation" }
      : null;
  }, [regulationNotification, evalNotification]);

  useEffect(() => {
    if (activeNotification?.message) {
      const timeout = setTimeout(() => {
        if (activeNotification.source === "regulation") {
          dispatch(clearRegulationNotification());
        } else {
          dispatch(clearEvaluationNotification());
        }
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [activeNotification, dispatch]);

  return (
    <section
      className={`p-6 rounded-xl shadow-lg ${GRADIENTS.WELCOME_BANNER} ${DARK_GRADIENTS.WELCOME_BANNER} transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      {activeNotification?.message && (
        <Notification
          message={activeNotification.message}
          type={activeNotification.type || undefined}
        />
      )}

      <h2
        className={`text-xl font-semibold mb-4 ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
      >
        Gestión de Normativas
      </h2>
      <p
        className={`mb-4 ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
      >
        Aquí puedes crear, editar y eliminar las preguntas de normativas del
        sistema.
      </p>

      {/* Menú de navegación */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Button
          onClick={() => setSelectedSection("createRegulation")}
          children="Crear Normativa"
          type="button"
        />
        <Button
          onClick={() => setSelectedSection("regulationList")}
          children="Editar Normativa"
          type="button"
        />
        <Button
          onClick={() => setSelectedSection("createForm")}
          children="Crear Formulario"
          type="button"
        />
      </div>

      {/* Secciones condicionales */}
      {selectedSection === "createRegulation" && <RegulationForm />}
      {selectedSection === "createForm" && <NormativeForm />}
      {selectedSection === "regulationList" && <RegulationList />}

      {/* Mensaje inicial */}
      {!selectedSection && (
        <div
          className={`p-4 text-center ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
        >
          Selecciona una opción del menú para gestionar normativas.
        </div>
      )}
    </section>
  );
};

export default StandardManagement;
