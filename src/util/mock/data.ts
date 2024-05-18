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

export const activities: ActivityCreateCredentials[] = Array.from(
  { length: 10 },
  () => ({
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
    name: faker.person.fullName(),
    startDateTime: faker.date.recent(),
    fromToday: faker.helpers.arrayElement([true, false]),
    endDateTime: faker.date.future(),
    noEndDate: faker.helpers.arrayElement([true, false]),
    price: Math.floor(Math.random() * 1000),
    category: faker.helpers.arrayElement([
      CategoryEnum.Art,
      CategoryEnum.Social,
    ]),
    type: faker.helpers.arrayElement([TypeEnum.ONLINE, TypeEnum.OFFLINE]),
    link: faker.internet.url(),
    location: faker.location.city(),
    address: faker.location.streetAddress(),
    summary: faker.lorem.sentence(),
    details: faker.lorem.paragraph(),
    isPrivate: faker.helpers.arrayElement([true, false]),
    displayRemainingTickets: faker.helpers.arrayElement([true, false]),
    isRecurring: faker.helpers.arrayElement([true, false]),
    recurring: {
      period: faker.helpers.arrayElement([PeriodEnum.MONTH]),
      week: faker.helpers.arrayElement([WeekEnum.FIRST]),
      day: faker.helpers.arrayElement([DayEnum.MONDAY]),
    },
    ticketMode: faker.helpers.arrayElement([TicketModeEnum.CHILLKA]),
    status: faker.helpers.arrayElement([StatusEnum.VALID]),
    customField: faker.helpers.arrayElement([true, false]),
    ticketRequired: faker.helpers.arrayElement([true, false]),
  })
);
