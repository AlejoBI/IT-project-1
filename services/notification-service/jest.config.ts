export default {
  preset: "ts-jest", // Soporte para TypeScript con Jest
  testEnvironment: "node", // Configuración para entorno Node.js
  setupFiles: ["dotenv/config"], // Cargar variables de entorno desde .env
  roots: ["<rootDir>/src"], // Carpeta raíz para los tests
  transform: {
    "^.+\\.ts$": "ts-jest", // Transformar solo archivos TypeScript
  },
  moduleFileExtensions: ["ts", "js", "json", "node"], // Extensiones admitidas
  moduleNameMapper: {
    "^@utils/(.*)$": "<rootDir>/src/utils/$1", // Alias para utilidades
    "^(.*)\\.js$": "$1.ts", // Mapear imports terminados en .js a .ts
  },
  collectCoverageFrom: ["src/**/*.ts"], // Archivos para cobertura
};