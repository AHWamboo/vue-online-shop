import type { Locator, Page } from "@playwright/test";

export class IndexPage {
  readonly page: Page;
  popularProduct: Locator;

  constructor(page: Page) {
    this.page = page;
    this.popularProduct = this.page.locator(".popular-picture");
  }

  async goto() {
    await this.page.goto("/");
  }
}
