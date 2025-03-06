import React from "react";
import AuthForm from "../components/forms/authForm/AuthForm";
import { useState } from "react";

import { useAuth } from "../hooks/useAuth";

const AuthPage = () => {
  const [selectedMode, setSelectedMode] = useState("login");

  const { error } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          {selectedMode === "login" ? "Iniciar sesión" : "Registrarse"}
        </h1>
        {error && (
          <div className="flex items-center gap-2 p-3 m-1 rounded-md bg-red-100 border border-red-200 text-red-700">
            {/* Icono de advertencia */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            {/* Mensaje de error */}
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}
        <AuthForm mode={selectedMode} />
        <button
          onClick={() =>
            setSelectedMode(selectedMode === "login" ? "register" : "login")
          }
          className="mt-4 text-blue-500 hover:underline focus:outline-none transition duration-300"
        >
          {selectedMode === "login"
            ? "¿No tienes cuenta? Regístrate"
            : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
