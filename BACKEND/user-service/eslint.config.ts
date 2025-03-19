import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  { ignores: ["dist", "node_modules"] }, // Ignorar archivos compilados y dependencias
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
    settings: {
      "import/resolver": {
        node: {
          extensions: [".ts", ".tsx", ".js", ".jsx"],
        },
      },
      plugins: [importPlugin], // Habilita el plugin de importaciones
      rules: {
        // Reglas generales
        indent: ["error", 2], // Usar 2 espacios para indentación
        quotes: ["error", "single"], // Usar comillas simples
        semi: ["error", "always"], // Siempre usar punto y coma
        "no-unused-vars": "warn", // Advertencia para variables no usadas
        "no-console": "warn", // Advertencia para uso de console.log
        "object-shorthand": "error", // Usar sintaxis corta para objetos
        "prefer-const": "error", // Usar const cuando sea posible

        // Reglas específicas para TypeScript
        "@typescript-eslint/no-explicit-any": "warn", // Advertencia para uso de `any`
        "@typescript-eslint/explicit-function-return-type": "off", // No forzar tipos explícitos en funciones
        "@typescript-eslint/no-non-null-assertion": "warn", // Advertencia para operador `!`
        "@typescript-eslint/no-unused-vars": "warn", // Advertencia para variables no usadas
        "@typescript-eslint/ban-ts-comment": "warn", // Advertencia para comentarios `@ts-ignore`
        "@typescript-eslint/no-floating-promises": "error", // Detecta promesas sin manejo

        // Reglas específicas para Node.js
        "node/no-unsupported-features/es-syntax": "off", // Permitir sintaxis moderna de ES Modules
        "node/no-missing-import": "off", // Desactivar errores por imports faltantes
        "node/no-unpublished-import": "off", // Desactivar errores por imports no publicados

        // Reglas de importaciones
        "import/no-unresolved": "error", // Detecta importaciones no resueltas
        "import/extensions": [
          "error",
          "ignorePackages",
          {
            ts: "never",
            tsx: "never",
            js: "never",
            jsx: "never",
          },
        ], // Evita usar extensiones en importaciones
      },
    },
  }
);
