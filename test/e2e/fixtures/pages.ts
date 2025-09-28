import { test as base } from "@playwright/test";
import * as pages from "@pwPages/pages";

type Fixtures = {
  basePage: pages.BasePage;
  indexPage: pages.IndexPage;
};

export const test = base.extend<Fixtures>({
  async basePage({ page }, use) {
    await use(new pages.BasePage(page));
  },
  async indexPage({ page }, use) {
    await use(new pages.IndexPage(page));
  },
});
