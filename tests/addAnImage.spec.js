import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test("test", async ({ page }) => {
  const config = {
    siteName: 'WKND Site',
    siteId: 'wknd',
    pageId: 'about-us',
    elementType: 'Image',
    label: 'TEST Image'
  }

    await page.goto(`http://localhost:4502/editor.html/content/${config.siteId}/language-masters/en/${config.pageId}.html`);

    await page.locator('//*[@data-type="Editable" and @role="link" and @data-text="Drag components here"]').dblclick();


await page.locator('//coral-selectlist-item[contains(text(),"Image")]').click();

await page.waitForLoadState('networkidle');
const newImage = await page.locator('//*[@role="link" and @title="Image"]').all();
await newButtons[newImage.length-1].dblclick();


// await page.locator('//label[text()="Text"]/following-sibling::input').type(config.label);
// await page.keyboard.press('Enter');
});
