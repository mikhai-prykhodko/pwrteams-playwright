import {test} from '../fixtures/common-fixture';
import {faker} from '@faker-js/faker';
import {expect} from '@playwright/test';
import {PassengerTestData, TestData} from '../src/testData/generateTestData';
import {Data} from '../src/testData/pages/passenger/data';

test.describe('Book a vacation', () => {
  test.beforeEach(async ({homePage}) => {
    await homePage.goto();
  });
  test('Validate passenger form fields @search', async ({
    searchPanelPage,
    searchResultsPage,
    progressBarNavigationPage,
    passengerDetailsPage,
    hotelDetailsPage,
    bookingSummaryPage,
  }) => {
    let adultPassengers: PassengerTestData[] = [];
    let childPassengers: PassengerTestData[] = [];
    test.step('Generate adult passengers', async () => {
      adultPassengers = TestData.getPassengerTestData(2, false);
    });
    test.step('Generate child passengers', async () => {
      childPassengers = TestData.getPassengerTestData(1, true);
    });
    await test.step('Close cookies banner', async () => {
      await searchPanelPage.closeCookiesBanner();
    });
    await test.step('Select first available airport', async () => {
      await searchPanelPage.selectAvailableAirport();
    });
    await test.step('Select first available destination', async () => {
      await searchPanelPage.openDestinationList();
      await searchPanelPage.selectDestination();
    });
    await test.step('Select first available departure date', async () => {
      await searchPanelPage.selectAvailableDepartureDate();
    });
    await test.step('Select number of adults and children', async () => {
      await searchPanelPage.selectPassengers(adultPassengers, childPassengers);
    });
    await test.step('Search hotels', async () => {
      await searchPanelPage.search();
      await searchResultsPage.waitForSearchResults();
    });
    await test.step('Select first available hotel', async () => {
      await searchResultsPage.selectFirstAvailableHotel();
    });
    await test.step('Navigate to vacation details', async () => {
      await hotelDetailsPage.waitForLoad();
      await progressBarNavigationPage.continueProcess();
    });
    await test.step('Navigate to booking details', async () => {
      await bookingSummaryPage.waitForLoad();
      await progressBarNavigationPage.continueProcess();
    });
    await test.step('Click pay button', async () => {
      await passengerDetailsPage.waitForLoad();
      await passengerDetailsPage.clickPay();
    });
    await test.step('Verify general error messages', async () => {
      await expect(
        passengerDetailsPage.elements.errorContainer(),
      ).toContainText(Data.getCommonData().errors.errorContainer);
      await expect(passengerDetailsPage.elements.consentError()).toContainText(
        Data.getCommonData().errors.consentError,
      );
    });
    await test.step('Verify error labels for passenger 1', async () => {
      for (const field of Data.getPassengerFields()) {
        await passengerDetailsPage.verifyPassengerErrorMessageForField({
          name: `${Data.getCommonData().elements.passenger} 1`,
          label: field.error.label,
          errorText: field.error.errors.empty,
        });
      }
    });
    await test.step('Verify error labels for passenger 2', async () => {
      for (const field of Data.getPassengerBasicFields()) {
        await passengerDetailsPage.verifyPassengerErrorMessageForField({
          name: `${Data.getCommonData().elements.passenger} 2`,
          label: field.error.label,
          errorText: field.error.errors.empty,
        });
      }
    });
    await test.step('Verify error labels for Child', async () => {
      for (const field of Data.getPassengerBasicFields()) {
        let count = 1;
        await passengerDetailsPage.verifyPassengerErrorMessageForField({
          name:
            childPassengers[0].age <= 1
              ? `${Data.getCommonData().elements.baby} ${count}`
              : `${Data.getCommonData().elements.child} ${count}`,
          label: field.error.label,
          errorText: field.error.errors.empty,
        });
        count++;
      }
    });
    await test.step('Fill wrong house number nd verify error', async () => {
      const houseNumber = Data.getErrorMessagesForField(
        'houseNumber',
        'wrongFormat',
      );
      await passengerDetailsPage.fillTextField({
        name: `${Data.getCommonData().elements.passenger} 1`,
        label: houseNumber.label,
        text: faker.lorem.sentence(5),
      });
      await passengerDetailsPage.page.keyboard.press('Tab');
      await passengerDetailsPage.verifyPassengerErrorMessageForField({
        name: `${Data.getCommonData().elements.passenger} 1`,
        label: houseNumber.label,
        errorText: houseNumber.errors.wrongFormat,
      });
    });
    await test.step('Fill wrong postcode and verify error', async () => {
      const postcode = Data.getErrorMessagesForField('postcode', 'wrongFormat');
      await passengerDetailsPage.fillTextField({
        name: `${Data.getCommonData().elements.passenger} 1`,
        label: postcode.label,
        text: faker.lorem.sentence(5),
      });
      await passengerDetailsPage.page.keyboard.press('Tab');
      await passengerDetailsPage.verifyPassengerErrorMessageForField({
        name: `${Data.getCommonData().elements.passenger} 1`,
        label: postcode.label,
        errorText: postcode.errors.wrongFormat,
      });
    });
    await test.step('Fill wrong mobile number and verify error', async () => {
      const phone = Data.getErrorMessagesForField('phone', 'wrongFormat');
      await passengerDetailsPage.fillTextField({
        name: `${Data.getCommonData().elements.passenger} 1`,
        label: phone.label,
        text: faker.lorem.sentence(1),
      });
      await passengerDetailsPage.page.keyboard.press('Tab');
      await passengerDetailsPage.verifyPassengerErrorMessageForField({
        name: `${Data.getCommonData().elements.passenger} 1`,
        label: phone.label,
        errorText: phone.errors.wrongFormat,
      });
    });
    await test.step('Fill wrong emil and verify error', async () => {
      const email = Data.getErrorMessagesForField('email', 'wrongFormat');
      await passengerDetailsPage.fillTextField({
        name: `${Data.getCommonData().elements.passenger} 1`,
        label: email.label,
        text: faker.lorem.sentence(1),
      });
      await passengerDetailsPage.page.keyboard.press('Tab');
      await passengerDetailsPage.verifyPassengerErrorMessageForField({
        name: `${Data.getCommonData().elements.passenger} 1`,
        label: email.label,
        errorText: email.errors.wrongFormat,
      });
    });
  });
});
