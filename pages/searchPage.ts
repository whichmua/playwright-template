import { Page, Locator } from "@playwright/test";

export class SearchPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getSearchInput(): Locator {
    return this.page.getByRole("combobox", { name: /search/i });
  }

  getResultTitles(): Locator {
    return this.page.locator(
      '[data-testid="result-title-a"], .result__a, a.result__a',
    );
  }
}
