import {test as base, Page} from '@playwright/test';
import {HomePage} from '../src/pages/homePage';
import {SearchPanelPage} from '../src/pages/search/searchPanelPage';
import {SearchResultsPage} from '../src/pages/search/searchResultsPage';
import {ProgressBarNavigationPage} from '../src/pages/booking/progressBarNavigationPage';
import {PassengerDetailsPage} from '../src/pages/booking/passengerDetailsPage';
import {HotelDetailsPage} from '../src/pages/booking/hotelDetailsPage';
import {BookingSummaryPage} from '../src/pages/booking/bookingSummaryPage';
export const test = base.extend<{
  homePage: HomePage;
  searchPanelPage: SearchPanelPage;
  searchResultsPage: SearchResultsPage;
  progressBarNavigationPage: ProgressBarNavigationPage;
  passengerDetailsPage: PassengerDetailsPage;
  hotelDetailsPage: HotelDetailsPage;
  bookingSummaryPage: BookingSummaryPage;
  page: Page;
}>({
  page: async ({page}, use) => {
    await use(page);
  },
  homePage: async ({page}, use) => {
    await use(new HomePage(page));
  },
  searchPanelPage: async ({page}, use) => {
    await use(new SearchPanelPage(page));
  },
  searchResultsPage: async ({page}, use) => {
    await use(new SearchResultsPage(page));
  },
  progressBarNavigationPage: async ({page}, use) => {
    await use(new ProgressBarNavigationPage(page));
  },
  passengerDetailsPage: async ({page}, use) => {
    await use(new PassengerDetailsPage(page));
  },
  hotelDetailsPage: async ({page}, use) => {
    await use(new HotelDetailsPage(page));
  },
  bookingSummaryPage: async ({page}, use) => {
    await use(new BookingSummaryPage(page));
  },
});

export {expect} from '@playwright/test';
