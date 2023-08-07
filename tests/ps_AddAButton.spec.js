import { test } from "@playwright/test";
import { addAComponent, goToAPage } from "../utils/commonMethods";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("add a button", async ({ page }) => {
  const config = {
    siteName: "WKND Site",
    siteId: "wknd",
    pageId: "about-us",
    elementType: "Button",
    label: "TEST Button",
  };
  await goToAPage(page, config);
  await addAComponent(page, config);
  await page.waitForLoadState("networkidle");
  const newButtons = await page
    .locator('//*[@role="link" and @title="Button"]')
    .all();
  await newButtons[newButtons.length - 1].dblclick();
  await page
    .locator('//label[text()="Text"]/following-sibling::input')
    .type(config.label);
  await page.keyboard.press("Enter");
});
