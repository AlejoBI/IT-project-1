import React, { useState } from "react";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../shared/constants";
import { recoverPasswordUser } from "../../application/store/auth/authActions";
import { useAppDispatch } from "../../presentation/hooks/useAppDispatch";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(recoverPasswordUser(email));
  };

  return (
    <div
      className={`max-w-md mx-auto py-10 px-6 rounded-lg shadow-lg transition-colors
            ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND} ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      <h2
        className={`text-2xl font-bold text-center
                ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
      >
        Recuperar Contraseña
      </h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label
            htmlFor="email"
            className={`block text-sm font-semibold
                        ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
          >
            Correo Electrónico:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`mt-2 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500}`}
          />
        </div>
        <button
          type="submit"
          className={`w-full py-3 mt-4 rounded-md text-white font-semibold
                    ${LIGHT_MODE_COLORS.BUTTON_BG} ${DARK_MODE_COLORS.BUTTON_BG} ${LIGHT_MODE_COLORS.BUTTON_HOVER_BG} ${DARK_MODE_COLORS.BUTTON_HOVER_BG}
                    transition duration-300 hover:opacity-80`}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default RecoverPassword;
