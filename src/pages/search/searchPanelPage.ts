import {BasePage} from '../base/basePage';
import {expect, Locator} from '@playwright/test';
import logger from '../../utils/logger';
import {
  Country,
  Destination,
  PassengerTestData,
  TestData,
} from '../../testData/generateTestData';
import {Errors} from '../../utils/errors';
import {
  getDaysInMonthInRandomOrder,
  getRandomElement,
} from '../../utils/utility-methods';
import {GenericWait} from '../../utils/genericWait';

export class SearchPanelPage extends BasePage {
  readonly elements = {
    cookiesBanner: () => this.page.locator('.cmNotifyBanner'),
    acceptCookiesButton: () => this.page.locator('#cmCloseBanner'),
    airportInput: () => this.page.getByTestId('airport-input'),
    airportsSection: () =>
      this.page.locator('[aria-label="airports"] div[class^="rah-static"]'),
    destinationListButton: () =>
      this.page.locator('[data-test-id="destination-input"] + span'),
    airportList: () =>
      this.page.locator('div[class="SelectAirports__childrenGroup"]'),
    airportCheckbox: (airport: string) =>
      this.page.getByRole('checkbox').filter({hasText: new RegExp(airport)}),
    saveSelectionButton: () =>
      this.page.locator('[aria-hidden="false"] [aria-label^="Opslaan"] button'),
    destinationCountry: (country: string) =>
      this.page.locator('a[class^="DestinationsList"]', {
        hasText: new RegExp(country),
      }),
    departureDateInput: () =>
      this.page.locator('[data-test-id="departure-date-input"]'),
    departureDateSelector: () =>
      this.page.locator(
        '[class*="datePickerContainer"] [class*="inputs__selectText"]',
      ),
    departureDateCell: (day?: string) =>
      this.page.locator(
        'td[class*="SelectLegacyDate__cell"]',
        day
          ? {
              hasText: new RegExp(`^${day}$`),
            }
          : undefined,
      ),
    departureDatesLoader: () =>
      this.page.locator('div[class="WaitingSpinner__spinnerWrapper"]'),
    roomsAndGuestsInput: () =>
      this.page.locator('[data-test-id="rooms-and-guest-input"]'),
    adultsSelector: () =>
      this.page.locator('[aria-label="adult select"] select'),
    childrenSelector: () =>
      this.page.locator('[aria-label="child select"] select'),
    childrenAgesSelector: () =>
      this.page.locator('[aria-label="age select"] select'),
    searchButton: () => this.page.getByTestId('search-button'),
    searchResults: () => this.page.getByTestId('search-results-list'),
  };

  /**
   * Accept cookies and close modal
   */
  async closeCookiesBanner(): Promise<void> {
    await this.elements.acceptCookiesButton().click();
  }

  /**
   * Select first available departure airport
   * Log name in console
   */
  async selectAvailableAirport(): Promise<void> {
    await this.elements.airportInput().click();
    let airportLocator: Locator;
    let isAvailable = false;
    const airportList: string[] = TestData.getAirportsList(
      process.env.COUNTRY as Country,
    );
    for (const airport of airportList) {
      airportLocator = this.elements.airportCheckbox(airport);
      isAvailable = !(await this.isDisabled(airportLocator.locator('input')));
      if (isAvailable === true) {
        break;
      }
    }
    if (isAvailable === false) {
      Errors.noAvailableDepartureAirportError();
    }
    await airportLocator.check();
    logger.info(`Departure airport: ${await airportLocator.innerText()}\n`);
    await this.elements.saveSelectionButton().click();
  }

  /**
   * Open destination list box
   */
  async openDestinationList(): Promise<void> {
    await this.elements.destinationListButton().click();
  }

  /**
   * Select first available destination airport
   * Log name in console
   */
  async selectDestination(): Promise<void> {
    let countryLocator: Locator;
    let airportLocator: Locator;
    let isAvailable = false;
    const destinations: Destination[] = TestData.shuffleDestinations();
    for (const destination of destinations) {
      countryLocator = this.elements.destinationCountry(destination.country);
      airportLocator = this.elements.airportCheckbox(
        getRandomElement(destination.destinations),
      );
      isAvailable = !(await this.isDisabled(countryLocator));
      if (isAvailable === true) {
        break;
      }
    }
    if (isAvailable === false) {
      Errors.noAvailableDestinationError(destinations);
    }
    await countryLocator.click();
    await airportLocator.check();
    logger.info(
      `Destination: ${await countryLocator.innerText()} - ${await airportLocator.innerText()}`,
    );
    await this.elements.saveSelectionButton().click();
  }

  /**
   * Select first available departure date
   */
  async selectAvailableDepartureDate(): Promise<void> {
    await this.elements.departureDateInput().click();
    // Wait for date selector to load
    await GenericWait.WaitForMatch(
      async () => await this.elements.departureDatesLoader().isHidden(),
      true,
    );
    await expect(this.elements.departureDateSelector()).toBeVisible();
    const month: string = await this.elements
      .departureDateSelector()
      .innerText();
    const maxDayInMonth: string = await this.elements
      .departureDateCell()
      .last()
      .innerText();
    const days: number[] = getDaysInMonthInRandomOrder(parseInt(maxDayInMonth));
    let dateLocator: Locator;
    let isAvailable = false;
    for (const day of days) {
      dateLocator = this.elements.departureDateCell(day.toString());
      isAvailable = !(await this.isDisabled(dateLocator));
      if (isAvailable === true) {
        logger.info(`Date: ${day} ${month}`);
        break;
      }
    }
    if (isAvailable === false) {
      Errors.noAvailableDepartureDateError(
        days.map((day) => day.toString() + ' '),
      );
    }
    if (await this.isVisible(dateLocator)) {
      await dateLocator.click();
      await this.elements.saveSelectionButton().click();
    }
  }

  /**
   * Select number of adults and children
   * @param adults - Array of adult passengers
   * @param children - Array of child passengers
   */
  async selectPassengers(
    adults: PassengerTestData[],
    children: PassengerTestData[],
  ): Promise<void> {
    await this.elements.roomsAndGuestsInput().click();
    await this.elements.adultsSelector().selectOption(adults.length.toString());
    await this.elements
      .childrenSelector()
      .selectOption(children.length.toString());
    logger.info(`Number of adults: ${adults.length}`);
    logger.info(`Number of children: ${children.length}`);
    for (let i = 0; i < children.length; i++) {
      await this.elements
        .childrenAgesSelector()
        .selectOption(children[i].age.toString());
      logger.info(`Child ${i + 1} age: ${children[i].age}`);
    }
    await this.elements.saveSelectionButton().click();
  }

  /**
   * Hit search button and wait for results
   */
  async search(): Promise<void> {
    await this.elements.searchButton().click();
  }
}
