import React from "react";
const Loader = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      role="status"
      aria-live="polite"
      aria-label="Cargando"
    >
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      <span className="sr-only">Cargando...</span>
    </div>
  );
};

export default Loader;
