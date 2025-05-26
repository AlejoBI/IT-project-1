import React, { useEffect, useState } from "react";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";
import Button from "../UI/Button";
import NormativeForm from "./NormativeForm";
import RegulationForm from "./RegulationForm";
import RegulationList from "./RegulationList";
import Notification from "../common/Notification";
import FileUpload from "./FileUpload";
import { useRegulation } from "../../hooks/useRegulation";
import { useEvaluation } from "../../hooks/useEvaluation";
import { clearNotification } from "../../../application/store/evaluationForm/evaluationFormSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { Form } from "../../../domain/models/types/EvaluationFormTypes";
import { createEvaluationFormAction } from "../../../application/store/evaluationForm/evaluationFormActions";

const StandardManagement = () => {
  const { error: regulationError, message: regulationMessage } =
    useRegulation();
  const { error: formsError, message: formsMessage } = useEvaluation();

  const dispatch = useAppDispatch();
  const error = regulationError || formsError;
  const message = regulationMessage || formsMessage;

  useEffect(() => {
    dispatch(clearNotification());
  }, [dispatch]);

  const [selectedSection, setSelectedSection] = useState<
    "createRegulation" | "createForm" | "regulationList" | null
  >(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleJsonUpload = async (data: Form) => {
    try {
      await dispatch(createEvaluationFormAction(data)).unwrap();
      setSelectedSection("regulationList");
    } catch {
      setUploadError("Error al crear el formulario.");
    }
  };

  const handleUploadError = (message: string) => {
    setUploadError(message);
  };

  return (
    <section
      className={`p-8 rounded-2xl shadow-xl ${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      {error && <Notification message={error} type="error" />}
      {message && <Notification message={message} type="success" />}

      <h2
        className={`text-3xl font-bold mb-2 text-center ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
      >
        Gestión de Normativas
      </h2>

      <p
        className={`text-md mb-6 text-center max-w-2xl mx-auto ${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
      >
        Administra normativas del sistema: crea nuevas, edita las existentes o
        diseña formularios de evaluación de manera sencilla.
      </p>

      {/* Menú de navegación */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
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
      {selectedSection === "createRegulation" && (
        <div
          className={`flex flex-col gap-6 ${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} p-6 rounded-xl`}
        >
          <RegulationForm />
        </div>
      )}

      {selectedSection === "createForm" && (
        <div
          className={`flex flex-col gap-6 ${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} p-6 rounded-xl`}
        >
          <FileUpload
            onJsonExtracted={handleJsonUpload}
            onError={handleUploadError}
          />
          {uploadError && <Notification message={uploadError} type="error" />}
          <NormativeForm />
        </div>
      )}

      {selectedSection === "regulationList" && <RegulationList />}
    </section>
  );
};

export default StandardManagement;
