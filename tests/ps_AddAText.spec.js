import { test } from "@playwright/test";
import { addAComponent, goToAPage } from "../utils/commonMethods";
const buttonProps = require("../input.json");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("add a text", async ({ page }) => {
  const config = {
    siteName: "WKND Site",
    siteId: "wknd",
    pageId: buttonProps["Page name"].toLowerCase().replaceAll(/ /g, "-"),
    elementType: "Text",
    text: buttonProps["Text to add"],
  };
  await goToAPage(page, config);
  await addAComponent(page, config);
  await page.reload();
  await page.waitForLoadState("networkidle");
  const newTexts = await page
    .locator('//*[@role="link" and @title="Text"]')
    .all();
  await newTexts[newTexts.length - 1].dblclick();
  await page
    .locator('//*[@data-cq-richtext-editable="true"]')
    .fill(config.text);
  await page.locator('//*[@icon="check" and @title="Done"]').click();
});
