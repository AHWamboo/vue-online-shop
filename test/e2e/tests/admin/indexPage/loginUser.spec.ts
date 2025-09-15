import { expect } from "@playwright/test";
import { test } from "@pwHelpers/playwrightTest";

test.describe("TC-LOGIN As an Admin - I want to test login", function () {
  test("TC-LOGIN01 Login options", async ({ indexPage }) => {
    const { $el } = indexPage;

    await expect($el.loginInput).toBeVisible();

    await $el.loginInput.fill("login");
    await $el.passwordInput.fill("paswdword");

    await expect($el.continueButton).toBeVisible();

    await test.step(``, async () => {});
  });
});
