import { test } from "@playwright/test";
import { addAComponent, goToAPage } from "../utils/commonMethods";
const buttonProps = require("../input.json");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("add a button", async ({ page }) => {
  const config = {
    siteName: "WKND Site",
    siteId: "wknd",
    pageId: buttonProps["Page name"].toLowerCase().replaceAll(/ /g, "-"),
    elementType: "Button",
    label: buttonProps["Button label"],
    link: buttonProps["Button link"],
  };
  await goToAPage(page, config);
  await addAComponent(page, config);
  await page.reload();
  await page.waitForLoadState("networkidle");
  const newButtons = await page
    .locator('//*[@role="link" and @title="Button"]')
    .all();
  await newButtons[newButtons.length - 1].dblclick();
  await page
    .locator('//label[text()="Text"]/following-sibling::input')
    .type(config.label);
  if (!!config.link) {
    await page
      .locator('//label[text()="Link"]/following-sibling::input')
      .type(config.link);
  }
  await page.keyboard.press("Enter");
});
