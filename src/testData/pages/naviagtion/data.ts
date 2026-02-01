import {Country} from '../../generateTestData';

export class Data {
  static readonly common = [
    {
      country: 'NL',
      elements: {
        continueButton: 'Verder',
        bookNowButton: 'Boek Nu',
      },
    },
  ];
  /**
   * Get elements data for a given country
   * @param country - Country
   * @returns Elements data
   */
  static getCommonData(country?: Country) {
    country = country || (process.env.COUNTRY as Country);
    const elements = this.common.find((element) => element.country === country);
    if (!elements) {
      throw new Error(`Elements for country ${country} not found`);
    }
    return elements;
  }
}
