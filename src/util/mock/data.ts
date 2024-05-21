import { faker } from '@faker-js/faker';
import {
  ActivityCreateCredentials,
  CategoryEnum,
  DayEnum,
  PeriodEnum,
  StatusEnum,
  TicketModeEnum,
  TypeEnum,
  WeekEnum,
} from '../../type/activity.type';

// Enum values
const categoryValues = Object.values(CategoryEnum);
const typeValues = Object.values(TypeEnum);
const periodValues = Object.values(PeriodEnum);
const weekValues = Object.values(WeekEnum);
const dayValues = Object.values(DayEnum);
const ticketModeValues = Object.values(TicketModeEnum);
const statusValues = Object.values(StatusEnum);

// Mock data
export const mockActivity: ActivityCreateCredentials = {
  name: faker.person.fullName(),
  organizer: {
    profilePicture: faker.image.urlLoremFlickr(),
    name: faker.person.fullName(),
    contactName: faker.person.fullName(),
    contactPhone: faker.phone.number(),
    contactEmail: faker.internet.email(),
    websiteName: faker.internet.domainName(),
    websiteURL: faker.internet.url(),
  },
  cover: Array.from({ length: 3 }, () => faker.image.urlLoremFlickr()),
  thumbnail: faker.image.urlLoremFlickr(),
  startDateTime: faker.date.recent(),
  fromToday: faker.helpers.arrayElement([true, false]),
  endDateTime: faker.date.future(),
  noEndDate: faker.helpers.arrayElement([true, false]),
  price: Math.floor(Math.random() * 1000),
  category: faker.helpers.arrayElement(categoryValues),
  type: faker.helpers.arrayElement(typeValues),
  link: faker.internet.url(),
  location: faker.location.city(),
  address: faker.location.streetAddress(),
  summary: faker.lorem.sentence(),
  details: faker.lorem.paragraph(),
  isPrivate: faker.helpers.arrayElement([true, false]),
  displayRemainingTickets: faker.helpers.arrayElement([true, false]),
  isRecurring: faker.helpers.arrayElement([true, false]),
  recurring: {
    period: faker.helpers.arrayElement(periodValues),
    week: faker.helpers.arrayElement(weekValues),
    day: faker.helpers.arrayElement(dayValues),
  },
  ticketMode: faker.helpers.arrayElement(ticketModeValues),
  status: faker.helpers.arrayElement(statusValues),
  customField: faker.helpers.arrayElement([true, false]),
  ticketRequired: faker.helpers.arrayElement([true, false]),
};
