async goToAPage(pageName, page) {
    await page.getByRole('link', { name: pageName}).click();
}

export default goToAPage;