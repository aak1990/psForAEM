import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test("test", async ({ page }) => {
    // test.setTimeout(120000);
 const config = {
    siteName: 'WKND Site',
    siteId: 'wknd',
    pageId: 'about-us',
    elementType: 'Image',
    label: 'TEST Image',
    teaserText: 'Welcome to AEM website',
  }

    await page.goto(`http://localhost:4502/editor.html/content/${config.siteId}/language-masters/en/${config.pageId}.html`);

    await page.locator('//*[@data-type="Editable" and @role="link" and @data-text="Drag components here"]').dblclick();

await page.locator('//coral-selectlist-item[contains(text(),"Teaser")]').click();

await page.reload()
await page.waitForLoadState('networkidle');
const newTeasers = await page.locator('//*[@role="link" and @title="Teaser"]').all();
await newTeasers[newTeasers.length-1].dblclick();
await page.locator('//coral-tab-label[contains(text(),"Text")]').click()
// await page.locator('//label[text()="Pretitle"]/following-sibling::input').type('vaevavhaev');
await page.getByLabel('Get title from linked page').uncheck();
await page.locator('//label[text()="Title"]/following-sibling::input').fill('');
await page.locator('//label[text()="Title"]/following-sibling::input').type('Welcome to our site');
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
