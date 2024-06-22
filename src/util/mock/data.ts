import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import {
  ActivitySchemaModel,
  CategoryEnum,
  DayEnum,
  LocationEnum,
  PeriodEnum,
  StatusEnum,
  TypeEnum,
  WeekEnum,
} from '../../type/activity.type';
import { TicketStatusEnum } from '../../type/ticket.type';

// Enum values
const categoryValues = Object.values(CategoryEnum);
const typeValues = Object.values(TypeEnum);
const locationValues = Object.values(LocationEnum);
const periodValues = Object.values(PeriodEnum);
const weekValues = Object.values(WeekEnum);
const dayValues = Object.values(DayEnum);

// Mock data
export const mockActivity: ActivitySchemaModel = {
  creatorId: new mongoose.Types.ObjectId(),
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
  location: faker.helpers.arrayElement(locationValues),
  address: faker.location.streetAddress(),
  summary: faker.lorem.sentence(),
  details: faker.lorem.paragraph(),
  isPrivate: faker.helpers.arrayElement([true, false]),
  displayRemainingTickets: faker.helpers.arrayElement([true, false]),
  remainingTickets: faker.number.int(100),
  isRecurring: faker.helpers.arrayElement([true, false]),
  recurring: {
    period: faker.helpers.arrayElement(periodValues),
    week: faker.helpers.arrayElement(weekValues),
    day: faker.helpers.arrayElement(dayValues),
  },
  status: StatusEnum.VALID,
  lat: faker.location.latitude(),
  lng: faker.location.longitude(),
  saved: faker.helpers.arrayElement([true, false]),
  participated: faker.helpers.arrayElement([true, false]),
  totalParticipantCapacity: faker.number.int(100),
  unlimitedQuantity: faker.helpers.arrayElement([true, false]),
  tickets: [
    {
      activityId: new mongoose.Types.ObjectId(),
      name: faker.commerce.productName(),
      price: faker.number.int(1000),
      startDateTime: faker.date.recent(),
      fromToday: faker.helpers.arrayElement([true, false]),
      endDateTime: faker.date.future(),
      noEndDate: faker.helpers.arrayElement([true, false]),
      participantCapacity: faker.number.int(100),
      soldNumber: faker.number.int(10),
      unlimitedQuantity: faker.helpers.arrayElement([true, false]),
      purchaseLimit: faker.number.int(10),
      description: faker.lorem.sentence(),
      purchaseDuplicate: faker.helpers.arrayElement([true, false]),
      ticketStatus: TicketStatusEnum.VALID,
    },
  ],
  questions: [],
};
