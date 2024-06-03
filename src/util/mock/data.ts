import { faker } from '@faker-js/faker';
import {
  ActivitySchemaModel,
  CategoryEnum,
  DayEnum,
  PeriodEnum,
  StatusEnum,
  TypeEnum,
  WeekEnum,
} from '../../type/activity.type';
import { TicketSchemaModel, TicketStatusEnum } from '../../type/ticket.type';

// Enum values
const categoryValues = Object.values(CategoryEnum);
const typeValues = Object.values(TypeEnum);
const periodValues = Object.values(PeriodEnum);
const weekValues = Object.values(WeekEnum);
const dayValues = Object.values(DayEnum);

// Mock data
export const mockActivity: Omit<
  ActivitySchemaModel,
  'creatorId' | 'tickets'
> & { tickets: Omit<TicketSchemaModel, 'activityId'>[] } = {
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
  status: StatusEnum.VALID,
  tickets: [
    {
      name: faker.commerce.productName(),
      price: 100,
      startDateTime: faker.date.recent(),
      fromToday: faker.helpers.arrayElement([true, false]),
      endDateTime: faker.date.future(),
      noEndDate: faker.helpers.arrayElement([true, false]),
      participantCapacity: 20,
      unlimitedQuantity: faker.helpers.arrayElement([true, false]),
      purchaseLimit: 20,
      description: faker.lorem.sentence(),
      purchaseDuplicate: faker.helpers.arrayElement([true, false]),
      ticketStatus: TicketStatusEnum.VALID,
    },
  ],
};
