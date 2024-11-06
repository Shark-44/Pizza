module.exports = {
  preset: 'ts-jest',  // Utilisation de ts-jest pour TypeScript
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};


  