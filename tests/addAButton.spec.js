import { test, expect } from "@playwright/test";
//import { goToAPage } from './navigateToPage';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test("test", async ({ page }) => {
  const config = {
    siteName: 'WKND Site',
    siteId: 'wknd',
    pageId: 'about-us',
    elementType: 'Button',
    label: 'TEST Button'
  }

//  await page.getByRole('link', { name: 'Sites' }).click();
//  await page.getByText(config.siteId).click();

//  await page.goto(`http://localhost:4502/sites.html/content/${config.siteId}/language-masters/en/${config.pageId}`);
    await page.goto(`http://localhost:4502/editor.html/content/${config.siteId}/language-masters/en/${config.pageId}.html`);

//     await page.getByRole('link', { name: 'Container [Root]' }).click();
//        await page.getByText('Drag components here')

    await page.locator('//*[@data-type="Editable" and @role="link" and @data-text="Drag components here"]').dblclick();
//
//     await page.getByRole('option', {name: config.elementType}).click();


//    await page.getByRole('button', {name: 'Configure'}).click();
await page.locator('//coral-selectlist-item[contains(text(),"Button")]').click();

//await page.keyboard.press('Tab');
//await page.keyboard.press('Enter');
await page.waitForLoadState('networkidle');
const newButtons = await page.locator('//*[@role="link" and @title="Button"]').all();
await newButtons[newButtons.length-1].dblclick();
await page.locator('//label[text()="Text"]/following-sibling::input').type(config.label);
await page.keyboard.press('Enter');
});
