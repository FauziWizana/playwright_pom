import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ExamplePage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly resultsList: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('input[name="search"]');
    this.searchButton = page.locator('button[type="submit"]');
    this.resultsList = page.locator('.results-list');
  }

  async performSearch(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  async getResultsCount(): Promise<number> {
    return await this.resultsList.locator('li').count();
  }
}
