import { test } from "@playwright/test";
import { goToAPage } from "../utils/commonMethods";
const imageProps = require("../input.json");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("update an image", async ({ page }) => {
  const config = {
    siteName: "WKND Site",
    siteId: "wknd",
    pageId: imageProps["Page name"].toLowerCase().replaceAll(/ /g, "-"),
    elementType: "Image",
    position: imageProps["position"],
  };
  await goToAPage(page, config);
  await page.waitForLoadState("networkidle");
  const allImages = await page
    .locator('//*[@role="link" and @title="Image"]')
    .all();

  console.log("*****All images****", allImages);
  await allImages[0].dblclick();
  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.locator("a", { hasText: "browse" }).click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles("image.jpg");
  await page.waitForLoadState("networkidle");
  await page.getByLabel(`Don’t provide an alternative text`).check();
  await page.getByLabel(`Don’t provide an alternative text`).uncheck();
  await page.getByLabel(`Inherit from description of asset`).uncheck();
  await page.getByLabel(`Don’t provide an alternative text`).check();
  await page.locator('//*[@icon="check" and @title="Done"]').click();
});
