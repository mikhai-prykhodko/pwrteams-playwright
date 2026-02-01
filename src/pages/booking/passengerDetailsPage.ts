import {BasePage} from '../base/basePage';
import {expect, Locator} from '@playwright/test';
import {Data} from '../../testData/pages/passenger/data';

export class PassengerDetailsPage extends BasePage {
  readonly elements = {
    pageHeading: () => this.page.locator('[aria-label="page heading"]'),
    payButton: () => this.page.locator('[aria-label="continue button"] button'),
    passengerContainer: (passenger: string) =>
      this.page.locator(
        `[aria-label="header bar"]:has(h3:text("${passenger}")) + [class*="PassengerFormV2__passengerContainer"]`,
      ),
    passengerFieldContainer: (label: string) =>
      this.page.locator(`div[class*="Box"][aria-label="${label}"]`).last(),
    fieldInput: (label: string) =>
      this.page.locator(`input[aria-label="${label}"]`),
    errorMessage: () => this.page.locator('[class*="errorMessageWithIcon"]'),
    errorContainer: () => this.page.locator('[aria-label="alert container"]'),
    consentError: () =>
      this.page.locator(
        '[aria-label="important information"] .UI__error_message_red',
      ),
  };

  /**
   * Verify if page is loaded
   */
  async waitForLoad() {
    await expect(this.page).toHaveURL(/.*passengerdetails.*/);
    await expect(this.elements.pageHeading()).toContainText(
      Data.getCommonData().elements.header,
    );
  }

  /**
   * Click pay button
   */
  async clickPay(): Promise<void> {
    await this.elements.payButton().click();
  }

  /**
   * Verify error message for specific field for passenger
   * @param name passenger name
   * @param label field label
   * @param errorText error to check
   */
  async verifyPassengerErrorMessageForField({
    name,
    label,
    errorText,
  }: {
    name: string;
    label: string;
    errorText: string;
  }) {
    const locator: Locator = this.elements
      .passengerContainer(name)
      .locator(this.elements.passengerFieldContainer(label))
      .locator(this.elements.errorMessage())
      .last();
    await expect
      .soft(
        locator,
        `The error message ${errorText} for field ${label} is wrong`,
      )
      .toHaveText(errorText);
  }

  /**
   * Fill value to text input
   * @param name passenger name
   * @param label field label
   * @param text value to enter
   */
  async fillTextField({
    name,
    label,
    text,
  }: {
    name: string;
    label: string;
    text: string;
  }) {
    await this.elements
      .passengerContainer(name)
      .locator(this.elements.fieldInput(label))
      .fill(text);
  }
}
