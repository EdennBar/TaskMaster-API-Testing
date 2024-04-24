import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        pageTitle: "API testing to check and design - Test Report",
        outputPath: "./jestReporter/test-report.html",
      },
    ],
  ],
};

export default config;
