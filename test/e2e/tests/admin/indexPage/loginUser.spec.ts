import { expect } from "@playwright/test";
import { test } from "@pwHelpers/pages";

test.describe("TC-INDEX As an Admin - I want to test index page", function () {
  test("TC-INDEX01 - popular products", async ({ indexPage }) => {
    const { popularProduct } = indexPage;

    await test.step("Go to index page and verify popular products", async () => {
      await indexPage.goto();

      await expect(popularProduct).toHaveCount(8);
    });

    await indexPage.page.pause();
  });
});
