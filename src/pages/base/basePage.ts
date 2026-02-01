import {Locator, Page} from '@playwright/test';

/**
 * Base class of common page functions
 */
export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  /**
   * Check if element is disabled
   * @param locator - Locator of element
   * @returns True if element is disabled, false otherwise
   */
  async isDisabled(locator: Locator): Promise<boolean> {
    const isNativeDisabled = await locator.isDisabled();
    const hasDisabledClass =
      (await locator.getAttribute('class'))?.includes('disabled') || false;
    const ariaDisabled =
      (await locator.getAttribute('aria-disabled')) === 'true';
    return isNativeDisabled || hasDisabledClass || ariaDisabled;
  }

  /**
   * Check if element is visible
   * @param locator - Locator of element
   * @returns True if element is visible, false otherwise
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Check if element is enabled
   * @param locator - Locator of element
   * @returns True if element is enabled, false otherwise
   */
  async isEnabled(locator: Locator): Promise<boolean> {
    return await locator.isEnabled();
  }
}
