import {BasePage} from '../base/basePage';
import {expect} from '@playwright/test';

export class BookingSummaryPage extends BasePage {
  readonly elements = {
    pageHeading: () => this.page.locator('[aria-label="page heading"]'),
  };

  /**
   * Verify if page is loaded
   */
  async waitForLoad(): Promise<void> {
    await expect(this.page).toHaveURL(/.*book\/flow\/summary.*/);
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.elements.pageHeading()).toBeVisible();
  }
}
