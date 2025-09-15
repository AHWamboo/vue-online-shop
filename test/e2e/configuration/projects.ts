import { devices } from "@playwright/test";

export const STORAGE_ADMIN = "playwright/.auth/admin.json";

const devtoolsArgs =
  process.env.VITE_PW_OPEN_DEVTOOLS === "true"
    ? "--auto-open-devtools-for-tabs"
    : "";

const baseProject = {
  use: {
    ...devices["Desktop Chrome"], // or 'Desktop Firefox' or 'Desktop Safari'
    launchOptions: { args: [devtoolsArgs, "--window-position=x,y"] },
    viewport: { width: 1920, height: 950 },
    // INFO: Macbook Air Viewport
    // viewport: { width: 1440, height: 720 },
    ignoreHTTPSErrors: true,
  },
};

export const listOfProjects = [
  {
    ...baseProject,
    name: "adminProject",
    testMatch: ["**/tests/admin/**"],
    // dependencies: ["SetupAdmin"],
    use: {
      ...baseProject.use,
      // storageState: STORAGE_ADMIN,
    },
  },
];
