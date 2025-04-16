import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Notification from "../components/common/Notification";
import EvaluationForm from "../components/compliance/EvaluationForm";
import ProgressTracker from "../components/compliance/ProgressTracker";
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS } from "../../shared/constants";

const Compliance = () => {
  const { user, isAuthenticated } = useAuth();
  const [answeredQuestions, setAnsweredQuestions] = useState(0); // Estado para el número de preguntas respondidas
  const [totalQuestions, setTotalQuestions] = useState(0); // Estado para el número total de preguntas

  if (!isAuthenticated) {
    return <p>Debes iniciar sesión para acceder a esta página.</p>;
  }

  return (
    <>
      <h1
        className={`text-3xl font-bold mb-6 text-center
                ${LIGHT_MODE_COLORS.TEXT_PRIMARY} 
                ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
      >
        Evaluación Normativa
      </h1>
      {!user?.emailVerified && (
        <Notification
          message="Por favor, verifica tu dirección de correo electrónico."
          type="warning"
        />
      )}
      <ProgressTracker
        totalQuestions={totalQuestions}
        answeredQuestions={answeredQuestions}
      />
      <EvaluationForm
        onQuestionsUpdate={(total, answered) => {
          setTotalQuestions(total);
          setAnsweredQuestions(answered);
        }}
      />
    </>
  );
};

export default Compliance;
