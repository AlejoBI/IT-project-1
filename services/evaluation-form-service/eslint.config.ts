import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] }, // Ignorar archivos compilados y dependencias
  {
    extends: [
      js.configs.recommended, // Configuración recomendada por ESLint
      ...tseslint.configs.recommended, // Configuración recomendada para TypeScript
    ],
    files: ["**/*.{ts,tsx}"], // Aplicar reglas solo a archivos TypeScript
    languageOptions: {
      ecmaVersion: "latest", // Compatible con ESNext
      sourceType: "module", // Compatible con "module": "ESNext"
      globals: {
        ...globals.node, // Variables globales específicas de Node.js
        firebase: "readonly", // Ejemplo: si usas Firebase como variable global
      },
    },
  }
);
