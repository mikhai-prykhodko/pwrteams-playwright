import {Country, Destination, TestData} from '../testData/generateTestData';
/**
 * Errors class
 */
export class Errors extends Error {
  /**
   * No available departure airport error
   */
  static noAvailableDepartureAirportError(): void {
    throw new Error(
      `No available departure airport found for country ${TestData.getAirportsList(process.env.COUNTRY as Country)}`,
    );
  }
  /**
   * No available destination error
   * @param destinations - Destinations array
   * @returns No available destination error
   */
  static noAvailableDestinationError(destinations: Destination[]): void {
    throw new Error(
      `No available destination found for destinations ${destinations.map((destination) => destination.country).join(', ')}`,
    );
  }
  /**
   * No available departure date error
   * @param dates - Dates array
   * @returns No available departure date error
   */
  static noAvailableDepartureDateError(dates: string[]): void {
    throw new Error(
      `No available departure date found for dates ${dates.join(', ')}`,
    );
  }
}
