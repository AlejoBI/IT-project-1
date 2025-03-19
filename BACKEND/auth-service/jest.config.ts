import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // Usar ts-jest para soporte de TypeScript
  testEnvironment: "node", // Entorno de pruebas: Node.js
  roots: ["<rootDir>/src"], // Carpeta donde están los archivos de prueba
  testMatch: ["**/*.test.ts"], // Patrón para encontrar archivos de prueba
  moduleFileExtensions: ["ts", "js", "json"], // Extensiones de archivo soportadas
  transform: {
    "^.+\\.ts$": "ts-jest", // Transformar archivos .ts con ts-jest
  },
  collectCoverage: true, // Habilitar la recolección de cobertura de código
  coverageDirectory: "<rootDir>/coverage", // Carpeta donde se generará la cobertura
  coverageReporters: ["text", "html"], // Formatos de reporte de cobertura
  coveragePathIgnorePatterns: [
    "/node_modules/", // Ignorar archivos en node_modules
    "/dist/", // Ignorar archivos compilados
  ],
};

export default config;
