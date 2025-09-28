import { defineConfig } from "@playwright/test";
import { listOfProjects } from "./test/e2e/configuration/projects";

const TEST_OUTPUT_FOLDER = `./playwright-out/adminProject`;

export default defineConfig({
  testDir: "./test/e2e",
  timeout: 45 * 1000,
  expect: {
    timeout: 30 * 1000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: "http://localhost:9000/#/",
    trace: "on",
    testIdAttribute: "data-e2e",
  },
  reporter: [
    ["html", { open: "on-failure", outputFolder: TEST_OUTPUT_FOLDER }],
  ],
  projects: listOfProjects,
});
