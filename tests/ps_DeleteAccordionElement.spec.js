import { test } from "@playwright/test";
import { goToAPage } from "../utils/commonMethods";
const accordionProps = require("../input.json");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("remove an element", async ({ page }) => {
  const config = {
    siteName: "WKND Site",
    siteId: "wknd",
    pageId: accordionProps["Page name"].toLowerCase().replaceAll(/ /g, "-"),
    elementType: "Accordion",
    description: accordionProps["Item description"],
  };
  await goToAPage(page, config);
  await page.waitForLoadState("networkidle");
  const newButtons = await page
    .locator('//*[@role="link" and @title="Accordion"]')
    .all();
  await newButtons[0].dblclick();
  await page.waitForLoadState("networkidle");
  await page.locator(`//input[@value="${config.description}"]`).click();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");

  await page.locator('//*[@icon="check" and @title="Done"]').click();
});
