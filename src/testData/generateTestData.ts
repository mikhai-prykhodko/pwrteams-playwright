import {faker} from '@faker-js/faker';
import moment, {Moment} from 'moment';
export type Country = 'NL' | 'DE';

export interface Destination {
  country: string;
  destinations: string[];
}

export interface PassengerTestData {
  firstName: string;
  surname: string;
  gender: string;
  birthDate: Moment;
  age: number;
  nationality: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  postcode: string;
  placeOfResidence: string;
  email: string;
  phone: string;
}

// TODO: add more destinations. Could be taken from DB or API call.
const destinations: Destination[] = [
  {
    country: 'Cyprus',
    destinations: ['Larnaca', 'Paphos'],
  },
  {
    country: 'Albanië',
    destinations: ['Durrës', 'Tirana'],
  },
];

export class TestData {
  static getAirportsList(country: Country): string[] {
    switch (country) {
      case 'NL':
        return ['Amsterdam', 'Rotterdam', 'Brussel', 'Eindhoven', 'Groningen'];
      case 'DE':
        return ['Berlin', 'Hamburg', 'Munich', 'Frankfurt', 'Cologne'];
    }
  }
  static getSomeDepartureAirport(): string {
    return faker.helpers.arrayElement(
      this.getAirportsList(process.env.COUNTRY as Country),
    );
  }
  static getSomeDestination(): Destination {
    const destination = faker.helpers.arrayElement(destinations);
    return destination;
  }
  static shuffleDestinations(): Destination[] {
    const shuffledDestinations = [...destinations];
    for (let i = shuffledDestinations.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDestinations[i], shuffledDestinations[j]] = [
        shuffledDestinations[j],
        shuffledDestinations[i],
      ];
    }
    return shuffledDestinations;
  }
  static getAllDaysInMonth(): string[] {
    const startOfMonth = moment([
      new Date().getFullYear(),
      new Date().getMonth(),
    ]);
    const daysInMonth = startOfMonth.daysInMonth();
    const allDays: string[] = [];
    for (let i = 0; i < daysInMonth; i++) {
      allDays.push(startOfMonth.clone().add(i, 'days').format('DD'));
    }
    return allDays;
  }
  static getPassengerTestData(
    count: number,
    isChild = false,
  ): PassengerTestData[] {
    const passengers: PassengerTestData[] = [];
    for (let i = 0; i < count; i++) {
      const fakeBirthDate: Date = faker.date.birthdate({
        min: isChild ? 0 : 18,
        max: isChild ? 17 : 99,
        mode: 'age',
      });
      passengers.push({
        firstName: faker.person.firstName(),
        surname: faker.person.lastName(),
        gender: faker.person.gender(),
        birthDate: moment(fakeBirthDate, 'DD/MM/YYYY'),
        age: this.getAge(fakeBirthDate),
        nationality: faker.location.country(),
        country: faker.location.country(),
        city: faker.location.city(),
        street: faker.location.street(),
        houseNumber: faker.number.int({min: 1, max: 1000}).toString(),
        postcode: faker.location.zipCode(),
        placeOfResidence: faker.location.city(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
      });
    }
    return passengers;
  }
  static getAge(birthDate: Date): number {
    const today = new Date();
    return today.getFullYear() - birthDate.getFullYear();
  }
}
