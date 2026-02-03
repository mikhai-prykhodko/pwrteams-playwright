import {BasePage} from '../base/basePage';
import {expect, Locator} from '@playwright/test';
import logger from '../../utils/logger';
import {GenericWait} from '../../utils/genericWait';

export class SearchResultsPage extends BasePage {
  readonly elements = {
    selectHotelButton: () =>
      this.page.locator('[class*="showPackage"]').getByLabel('continue'),
    hotelName: () => this.page.getByTestId('hotel-name'),
  };

  /**
   * Wait for search results to be visible
   */
  async waitForSearchResults(): Promise<void> {
    await expect(this.page).toHaveURL(/.*packages.*/);
    await GenericWait.WaitForMatch(
      async () => await this.elements.selectHotelButton().first().isVisible(),
      true,
    );
  }

  /**
   * Select first available hotel and log it in the console
   */
  async selectFirstAvailableHotel(): Promise<void> {
    const hotel: Locator = this.elements.hotelName().first();
    logger.info(`Hotel: ${await hotel.innerText()}`);
    await hotel.click();
  }
}
