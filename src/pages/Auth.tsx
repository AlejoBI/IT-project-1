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
        {error && <p className="text-red-500">Error: {error}</p>}
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
