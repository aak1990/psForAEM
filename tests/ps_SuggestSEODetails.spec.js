import { test } from "@playwright/test";
import { goToAPage } from "../utils/commonMethods";
const props = require("../input.json");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("add a title", async ({ page }) => {
  const config = {
    siteName: "WKND Site",
    siteId: "wknd",
    pageId: props["Page name"].toLowerCase().replaceAll(/ /g, "-"),
    title: props["SEO title"],
  };

  await page.goto(
    `http://localhost:4502/mnt/overlay/wcm/core/content/sites/properties.html?item=%2Fcontent%2F${config.siteId}%2Flanguage-masters%2Fen%2F${config.pageId}`
  );

  await page.waitForLoadState("networkidle");

  await page
    .locator('//input[@type="text" and @name="./jcr:title"]')
    .fill(config.title);

  await page
    .locator('//coral-button-label[contains(text(),"Save & Close")]')
    .click();
});
