import { test as base } from "@playwright/test";
import * as pages from "@pwPages/pages";
import type * as PagesTypes from "@pwPages/pagesTypes";

type Fixtures = {
  basePage: PagesTypes.BasePageType;
  indexPage: PagesTypes.IndexPageType;
};

export const test = base.extend<Fixtures>({
  async basePage({ page }, use) {
    await use(pages.BasePage(page));
  },
  async indexPage({ page }, use) {
    await use(pages.IndexPage(page));
  },
});
