export const preset = 'ts-jest';
export const testEnvironment = 'node';
export const setupFiles = ['./jest.setup.js'];
export const transform = {
  '^.+\\.tsx?$': 'ts-jest',
};
export const moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx', 'json', 'node'];