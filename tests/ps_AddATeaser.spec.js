import { test, expect } from "@playwright/test";
const teaserProps = require("../input.json");
import { addAComponent, goToAPage } from "../utils/commonMethods";

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test("test", async ({ page }) => {
    // test.setTimeout(120000);
  const config = {
    siteName: 'WKND Site',
    siteId: 'wknd',
    pageId: teaserProps["Page name"].toLowerCase().replaceAll(/ /g, "-"),
    elementType: 'Teaser',
    teaserText:  teaserProps["Text for teaser"],
  }

  await goToAPage(page, config);
  await addAComponent(page, config);
  await page.reload();
  await page.waitForLoadState("networkidle");

  const newTeasers = await page.locator('//*[@role="link" and @title="Teaser"]').all();
  await newTeasers[newTeasers.length-1].dblclick();
  await page.locator('//coral-tab-label[contains(text(),"Text")]').click()
  // await page.locator('//label[text()="Pretitle"]/following-sibling::input').type('vaevavhaev');
  await page.getByLabel('Get title from linked page').uncheck();
  await page.locator('//label[text()="Title"]/following-sibling::input').fill('');
  await page.locator('//label[text()="Title"]/following-sibling::input').type(config.teaserText);
  await page.locator('//coral-tab-label[contains(text(),"Asset")]').click()
  await page.getByLabel('Inherit featured image from page').uncheck();
  // await page.waitForLoadState('networkidle');
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('a', { hasText: 'browse' }).click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles('image.jpg');

  // await page.waitForLoadState('networkidle');
  await page.getByLabel(`Don’t provide an alternative text`).check();
  await page.getByLabel(`Don’t provide an alternative text`).uncheck();
  await page.getByLabel(`Inherit from description of asset`).uncheck();
  await page.getByLabel(`Don’t provide an alternative text`).check();


  await page.keyboard.press('Enter');
});
