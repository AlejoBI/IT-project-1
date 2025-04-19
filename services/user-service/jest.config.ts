export default {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "js", "json", "node"],
  moduleNameMapper: {
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^(\\.{1,2}/.*)\\.js$": "$1"  // Esto para ignorar .js en tests
  },
  collectCoverageFrom: ["src/**/*.ts"]
};
