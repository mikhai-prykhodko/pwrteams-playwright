import {BasePage} from './base/basePage';
import {expect} from '@playwright/test';

export class HomePage extends BasePage {
  readonly elements = {
    header: {
      logo: () => this.page.locator('.oh-toolbar__logo'),
    },
  };

  /**
   * Navigates to the homepage
   */
  async goto(): Promise<void> {
    await this.page.goto('/h/nl');
    await this.waitForLoad();
  }

  /**
   * Validate if the page is loaded
   * @protected
   */
  protected async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page).toHaveURL(/\/h\/nl/);
    await expect(this.elements.header.logo()).toBeVisible();
  }
}
