import { test } from "@playwright/test";
import { goToAPage } from "../utils/commonMethods";
const buttonProps = require("../input.json");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("remove an element", async ({ page }) => {
  const config = {
    siteName: "WKND Site",
    siteId: "wknd",
    pageId: buttonProps["Page name"].toLowerCase().replaceAll(/ /g, "-"),
    elementType: buttonProps["Element"],
    position: buttonProps["Position"],
  };
  await goToAPage(page, config);
  await page.waitForLoadState("networkidle");
  const elementType = config.elementType
    ? capitalizeEveryWord(config.elementType)
    : "Button";
  console.log("elementType", elementType);
  const newButtons = await page
    .locator(`//*[@role="link" and @title="${elementType}"]`)
    .all();
  const pos = !isNaN(parseInt(config.position))
    ? parseInt(config.position) - 1
    : 0;
  await newButtons[pos].click();
  await page.waitForLoadState("networkidle");
  await page.locator('//*[@type="button" and @title="Delete"]').click();
  await page.locator('//*[@id="DELETE"]').click();
});

function capitalizeEveryWord(text) {
  return text.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}
