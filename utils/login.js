const login = async (page, username, password) => {
  await page.goto("");
  await page.getByPlaceholder("User name").click();
  await page.getByPlaceholder("User name").fill(username);
  await page.getByPlaceholder("User name").press("Tab");
  await page.getByPlaceholder("Password", { exact: true }).fill(password);
  await page.getByPlaceholder("Password", { exact: true }).press("Enter");
};

export default login;
