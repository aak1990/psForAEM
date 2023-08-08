export const goToAPage = async (page, config) => {
    await page.goto(`http://localhost:4502/editor.html/content/wknd/language-masters/en/${config.pageId}.html`);
}

export const addAComponent = async (page, config) => {
    await page.locator('//*[@data-type="Editable" and @role="link" and @data-text="Drag components here"]').dblclick();
    await page.locator(`//coral-selectlist-item[contains(text(),"${config.elementType}")]`).click();
}