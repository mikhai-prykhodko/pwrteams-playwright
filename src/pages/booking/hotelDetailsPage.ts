import {BasePage} from '../base/basePage';
import {expect} from '@playwright/test';

export class HotelDetailsPage extends BasePage {
  readonly elements = {
    hotelName: () =>
      this.page.getByLabel('accomodation header').locator('h1 span'),
  };

  /**
   * Verify if page is loaded
   */
  async waitForLoad(): Promise<void> {
    await expect(this.page).toHaveURL(/.*bookaccommodation.*/);
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.elements.hotelName()).toBeVisible();
  }
}
