import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-800">
          Oops! Página no encontrada.
        </p>
        <p className="mt-2 text-gray-600">
          La página que estás buscando no existe o fue movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
