import {test as base, Page} from '@playwright/test';
import {HomePage} from '../pages/homePage';
import {SearchPanelPage} from '../pages/search/searchPanelPage';
import {SearchResultsPage} from '../pages/search/searchResultsPage';
import {ProgressBarNavigationPage} from '../pages/booking/progressBarNavigationPage';
import {PassengerDetailsPage} from '../pages/booking/passengerDetailsPage';
import {HotelDetailsPage} from '../pages/booking/hotelDetailsPage';
import {BookingSummaryPage} from '../pages/booking/bookingSummaryPage';
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
