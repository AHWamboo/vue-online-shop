import type { Page } from "@playwright/test";
import { paths } from "../data/paths";
import config from "../../../playwright.config";
import { MainMenu } from "../sections/mainMenu.section";

const baseUrl = new URL(paths.index, config.use?.baseURL).href;

function getElements(page: Page) {
  const browserOverlay = page.getByTestId("browser-overlay");
  const popoverTooltip = page.getByTestId("popover");
  return {
    browserOverlay,
    popoverTooltip,
  };
}

export function BasePage(page: Page) {
  const baseElements = getElements(page);

  const sections = {
    mainMenu: MainMenu(page),
  };

  return {
    ...sections,
    baseElements,
    page,

    async gotoURL(url = baseUrl) {
      if (url === undefined) {
        await page.goto(baseUrl);
        return;
      }
      await page.goto(url);
    },

    async getLocalStorage() {
      return page.evaluate(() => window.localStorage);
    },

    async setLocalStorage(key: string, value: object | string | boolean) {
      return page.evaluate(
        ({ key: keyInBrowser, value: valueInBrowser }) => {
          window.localStorage.setItem(
            keyInBrowser,
            JSON.stringify(valueInBrowser)
          );
        },
        { key, value }
      );
    },

    async removeItemLocalStorage(key: string) {
      return page.evaluate((keyInBrowser) => {
        window.localStorage.removeItem(keyInBrowser);
      }, key);
    },

    async getClipboardStorage(): Promise<string> {
      return page.evaluate("navigator.clipboard.readText()");
    },
  };
}
