import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // Allows TypeScript with Jest
  testEnvironment: "jsdom", // Suitable for testing frontend code
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testPathIgnorePatterns: ["/node_modules/", "/e2e/"], // Ignore e2e directory for Jest
};

export default config;
