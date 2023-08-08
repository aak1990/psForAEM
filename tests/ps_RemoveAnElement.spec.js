import { test } from "@playwright/test";
import { addAComponent, goToAPage } from "../utils/commonMethods";
const buttonProps = require("../input.json");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("remove an element", async ({ page }) => {
  const config = {
    siteName: "WKND Site",
    siteId: "wknd",
    pageId: buttonProps["Page name"].toLowerCase().replaceAll(/ /g, "-"),
    elementType: "Button",
    label: buttonProps["Button label"],
    link: buttonProps["Button link"],
  };
  await goToAPage(page, config);
  await page.waitForLoadState("networkidle");
  const newButtons = await page
    .locator('//*[@role="link" and @title="Experience Fragment"]')
    .all();
  await newButtons[0].click();
  await page.waitForLoadState("networkidle");
  await page.locator('//*[@type="button" and @title="Delete"]').click()
  await page.locator('//*[@id="DELETE"]').click()
  

  
});
