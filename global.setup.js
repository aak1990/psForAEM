import login from "./utils/login";
import path from "path";
import { test } from "@playwright/test";

const username = process.env.AEM_USERNAME ?? "";
const password = process.env.AEM_PASSWORD ?? "";
const STORAGE_STATE = path.join(__dirname, "e2e/.auth/user.json");

test("do login", async ({ page }) => {
  console.log("Inside authenticator");
  await login(page, username, password);
  console.log("storage path", STORAGE_STATE);
  await page.context().storageState({ path: STORAGE_STATE });
});
