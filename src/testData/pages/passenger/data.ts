import {Country} from '../../../testData/generateTestData';
export interface FieldData {
  country: Country;
  label: string;
  errors: {
    empty: string;
    wrongFormat: string;
  };
}
export interface Field {
  name: string;
  isBasic: boolean;
  data: FieldData[];
}

/** Field with the single error object for a given country (not the full errors array) */
export interface FieldWithErrorsList {
  name: string;
  isBasic: boolean;
  error: FieldData;
}

export type FieldName =
  | 'firstName'
  | 'lastName'
  | 'gender'
  | 'birthDate'
  | 'streetName'
  | 'houseNumber'
  | 'postcode'
  | 'placeOfResidence'
  | 'email'
  | 'phone';
export class Data {
  // TODO: add more countries and error messages. Could be taken from DB or API call.
  static readonly common = [
    {
      country: 'NL',
      elements: {
        header: 'Persoonsgegevens',
        passenger: 'Volwassene',
        child: 'Kind',
        baby: 'Baby',
      },
      errors: {
        errorContainer: 'Oeps, wijzig bovenstaand(e) 8 veld(en) nogmaals',
        consentError:
          'Bevestig dat je akkoord gaat met de algemene voorwaarden om je reservering af te ronden.',
      },
    },
  ];

  static errorMessages: Field[] = [
    {
      name: 'firstName',
      isBasic: true,
      data: [
        {
          country: 'NL',
          label: 'Eerste voornaam',
          errors: {
            empty: 'Vul de voornaam in (volgens paspoort)',
            wrongFormat: 'Vul een geldige voornaam in',
          },
        },
      ],
    },
    {
      name: 'lastName',
      isBasic: true,
      data: [
        {
          country: 'NL',
          label: 'Achternaam',
          errors: {
            empty: 'Vul de achternaam in (volgens paspoort)',
            wrongFormat: 'Vul een geldige achternaam in',
          },
        },
      ],
    },
    {
      name: 'gender',
      isBasic: true,
      data: [
        {
          country: 'NL',
          label: 'Geslacht',
          errors: {
            empty: 'Selecteer een geslacht',
            wrongFormat: 'Selecteer een geldig geslacht',
          },
        },
      ],
    },
    {
      name: 'birthDate',
      isBasic: true,
      data: [
        {
          country: 'NL',
          label: 'Geboortedatum',
          errors: {
            empty: 'Voer de geboortedatum als volgt in: DD/MM/JJJJ',
            wrongFormat: 'Voer de geboortedatum als volgt in: DD/MM/JJJJ',
          },
        },
      ],
    },
    {
      name: 'streetName',
      isBasic: false,
      data: [
        {
          country: 'NL',
          label: 'Straatnaam',
          errors: {
            empty: 'Vul de straatnaam in',
            wrongFormat: 'Vul een geldige straatnaam in',
          },
        },
      ],
    },
    {
      name: 'houseNumber',
      isBasic: false,
      data: [
        {
          country: 'NL',
          label: 'Huisnummer',
          errors: {
            empty: 'Vul het huisnummer in',
            wrongFormat: 'Vul een geldig huisnummer in',
          },
        },
      ],
    },
    {
      name: 'postcode',
      isBasic: false,
      data: [
        {
          country: 'NL',
          label: 'Postcode',
          errors: {
            empty: 'Vul de postcode in',
            wrongFormat: 'Vul een geldige postcode in.',
          },
        },
      ],
    },
    {
      name: 'placeOfResidence',
      isBasic: false,
      data: [
        {
          country: 'NL',
          label: 'Woonplaats',
          errors: {
            empty: 'Vul de woonplaats in',
            wrongFormat: 'Vul een geldige woonplaats in',
          },
        },
      ],
    },
    {
      name: 'email',
      isBasic: false,
      data: [
        {
          country: 'NL',
          label: 'E-mailadres',
          errors: {
            empty: 'Vul het e-mailadres in',
            wrongFormat: 'Vul een geldig e-mailadres in',
          },
        },
      ],
    },
    {
      name: 'phone',
      isBasic: false,
      data: [
        {
          country: 'NL',
          label: 'Mobiel telefoonnummer',
          errors: {
            empty: 'Vul het telefoonnummer in',
            wrongFormat: 'Vul het juiste telefoonnummer in',
          },
        },
      ],
    },
  ];
  //     {
  //       country: 'NL',
  //       fields: [
  //         {
  //           name: 'firstName',
  //           label: 'Eerste voornaam',
  //           error: 'Vul de voornaam in (volgens paspoort)',
  //         },
  //         {
  //           label: 'Achternaam',
  //           error: 'Vul de achternaam in (volgens paspoort)',
  //         },
  //         {
  //           label: 'Geslacht',
  //           error: 'Selecteer een geslacht',
  //         },
  //         {
  //           label: 'Geboortedatum',
  //           error: 'Voer de geboortedatum als volgt in: DD/MM/JJJJ',
  //         },
  //       ],
  //     },
  //   ];

  //   static readonly extendedPassengerFields = [
  //     {
  //       country: 'NL',
  //       fields: [
  //         {
  //           label: 'Straatnaam',
  //           error: 'Vul de straatnaam in',
  //         },
  //         {
  //           label: 'Huisnummer',
  //           error: 'Vul het huisnummer in',
  //         },
  //         {
  //           label: 'Postcode',
  //           error: 'Vul de postcode in',
  //         },
  //         {
  //           label: 'Woonplaats',
  //           error: 'Vul de woonplaats in',
  //         },
  //         {
  //           label: 'Mobiel telefoonnummer',
  //           error: 'Vul het telefoonnummer in',
  //         },
  //         {
  //           label: 'E-mailadres',
  //           error: 'Vul het e-mailadres in',
  //         },
  //       ],
  //     },
  //   ];
  /**
   * Get error messages for a given field
   * @param fieldName - Field name
   * @param isBasic - Is basic field
   * @param errorType - Error type
   * @returns Error message
   */
  static getErrorMessagesForField(
    fieldName: FieldName,
    errorType: 'empty' | 'wrongFormat',
  ) {
    const country = process.env.COUNTRY as Country;
    const errorMessage = this.errorMessages
      .find((message) => message.name === fieldName)
      .data.find((data) => data.country === country && data.errors[errorType]);
    if (!errorMessage) {
      throw new Error(`Error messages for field ${fieldName} not found`);
    }
    return errorMessage;
  }

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
  /**
   * Get basic passenger fields for a given country
   * @param country - Country
   * @returns Basic passenger fields with single error object per field
   */
  static getPassengerBasicFields(country?: Country): FieldWithErrorsList[] {
    country = country || (process.env.COUNTRY as Country);
    const fields = this.errorMessages
      .filter((field) => field.isBasic)
      .map((field) => {
        const error = field.data.find((e) => e.country === country);
        if (!error) return null;
        return {name: field.name, isBasic: field.isBasic, error};
      });
    if (!fields.length) {
      throw new Error(
        `Basic passenger fields for country ${country} not found`,
      );
    }
    return fields;
  }
  /**
   * Get extended passenger fields for a given country
   * @param country - Country
   * @returns Extended passenger fields with single error object per field
   */
  static getPassengerExtendedFields(country?: Country): FieldWithErrorsList[] {
    country = country || (process.env.COUNTRY as Country);
    const fields = this.errorMessages
      .filter((field) => !field.isBasic)
      .map((field) => {
        const error = field.data.find((e) => e.country === country);
        if (!error) return null;
        return {name: field.name, isBasic: field.isBasic, error};
      });
    if (!fields.length) {
      throw new Error(
        `Extended passenger fields for country ${country} not found`,
      );
    }
    return fields;
  }
  /**
   * Get all passenger fields for a given country
   * @param country - Country
   * @returns All passenger fields with single error object per field
   */
  static getPassengerFields(country?: Country): FieldWithErrorsList[] {
    return [
      ...this.getPassengerBasicFields(country),
      ...this.getPassengerExtendedFields(country),
    ];
  }
}
