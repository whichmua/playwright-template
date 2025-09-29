import { test, expect, Page } from "@playwright/test";
import { PageUrls } from "../support/urls";
import { SearchPage } from "../pages/searchPage";

test("Verify DuckDuckGo search results – apple music", async ({
  page,
}: {
  page: Page;
}) => {
  const search = new SearchPage(page);

  // Navigate to DuckDuckGo homepage
  await page.goto(PageUrls.duckDuckGoPage());

  // Perform search for "apple music"
  await search.getSearchInput().waitFor({ state: "visible" });
  await search.getSearchInput().fill("apple music");
  await page.keyboard.press("Enter");

  // Verify the first result
  const firstResult = search.getResultTitles().first();
  await expect(
    firstResult,
    "First search result should be visible",
  ).toBeVisible();

  const href = await firstResult.getAttribute("href");
  expect.soft(href, "First result should have an href").toBeTruthy();

  expect(href || "").toContain("music.apple.com");
});
