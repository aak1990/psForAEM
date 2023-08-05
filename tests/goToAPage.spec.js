import { test, expect } from "@playwright/test";

test('test', async ({ page }) => {
    await page.getByRole('link', { name: 'Sites' }).click();
    await page.locator('coral-columnview-item-content:has-text("WKND Site")').click();
  });

