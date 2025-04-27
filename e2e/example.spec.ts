import { test, expect } from "@playwright/test";

// トップページのタイトル表示を確認するe2eテスト

test("トップページのタイトルが正しく表示される", async ({ page }) => {
  await page.goto("/");
  // 例: h1要素に"MyApp"が表示されていることを確認
  const title = page.locator("h1");
  await expect(title).toHaveText(/MyApp|myapp|トップページ/i);
});
