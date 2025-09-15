import type { Page } from "@playwright/test";

function getElements(page: Page) {
  const loginInput = page.locator("#username");
  const passwordInput = page.locator("#password");
  const submitButton = page.getByRole("button", { name: "Sign in" });
  const continueButton = page.getByRole("button", { name: "Continue" });
  const alertBox = page.locator('div[role="alert"]');

  return {
    loginInput,
    passwordInput,
    submitButton,
    continueButton,
    alertBox,
  };
}

export function IndexPage(page: Page) {
  const $el = getElements(page);

  return {
    $el,

    async exampleFunction() {},
  };
}
