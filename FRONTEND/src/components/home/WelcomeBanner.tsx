import React from "react";

const WelcomeBanner = ({
  user,
  isAuthenticated,
  emailVerified,
}: {
  user: string | null | undefined;
  isAuthenticated: boolean | null | undefined;
  emailVerified: boolean | null | undefined;
}) => {
  return (
    <div className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 shadow-lg">
      <h1 className="text-3xl font-bold">Bienvenido a ISOlytics</h1>
      {isAuthenticated ? (
        <>
          <p className="mt-2">
            Hola, <strong>{user || "Usuario"}</strong>! Continúa trabajando en
            tu cumplimiento normativo.
          </p>
          {!emailVerified && (
            <p className="mt-2">
              Por favor, verifica tu correo electrónico para acceder a todas las
              funciones.
            </p>
          )}
        </>
      ) : (
        <p className="mt-2">
          Inicia sesión para acceder a tus herramientas de cumplimiento.
        </p>
      )}
    </div>
  );
};

export default WelcomeBanner;
