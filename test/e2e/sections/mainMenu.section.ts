import type { Page } from "@playwright/test";

function getElements(page: Page) {
  const menu = page.getByTestId("main-menu");

  return {
    menu,
  };
}

export function MainMenu(page: Page) {
  const $el = getElements(page);

  return {
    $el,
  };
}
