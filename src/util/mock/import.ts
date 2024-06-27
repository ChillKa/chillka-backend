import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import Activity from '../../model/activity.model';
import Ticket from '../../model/ticket.model';
import {
  CategoryEnum,
  DayEnum,
  LocationEnum,
  PeriodEnum,
  StatusEnum,
  TypeEnum,
  WeekEnum,
} from '../../type/activity.type';
import { TicketStatusEnum } from '../../type/ticket.type';
import User from '../../model/user.model';
import mockUsers from './data/user';
import mockKeywords from './data/keyword';
import mockActivities from './data/activity';
import mockComments from './data/comment';
import mockProfilePictures from './images/user.json';
import Organizer from '../../model/organizer.model';
import mockOrganizers from './data/organizer';
import Keyword from '../../model/keyword.model';
import Comment from '../../model/comment.model';
import { UserSchemaModel } from '../../type/user.type';
import artImages from './images/art.json';
import gamesImages from './images/games.json';
import healthImages from './images/health.json';
import hobbiesImages from './images/hobbies.json';
import outdoorImages from './images/outdoor.json';
import socialImages from './images/social.json';
import sportsImages from './images/sports.json';
import technologyImages from './images/technology.json';

// Enum values
const categoryValues = Object.values(CategoryEnum);
const typeValues = Object.values(TypeEnum);
const locationValues = Object.values(LocationEnum);
const periodValues = Object.values(PeriodEnum);
const weekValues = Object.values(WeekEnum);
const dayValues = Object.values(DayEnum);

// Import mock data
export const importRandomMockActivity = async (quantity: number) => {
  for (const _ of Array(quantity)) {
    const fromToday = faker.helpers.arrayElement([true, false]);
    const startDateTime = fromToday ? new Date() : faker.date.recent();
    const mockActivity = {
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
      startDateTime,
      fromToday,
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
      totalParticipantCapacity: 0,
      unlimitedQuantity: faker.helpers.arrayElement([true, false]),
      questions: [],
    };

    const newActivity = await new Activity(mockActivity);

    const mockTickets = [];
    for (const _ of Array(faker.number.int(2) + 1)) {
      const mockTicket = {
        activityId: newActivity._id,
        name: faker.commerce.productName(),
        price: faker.number.int(1000),
        startDateTime: faker.date.recent(),
        fromToday: faker.helpers.arrayElement([true, false]),
        endDateTime: faker.date.future(),
        noEndDate: faker.helpers.arrayElement([true, false]),
        participantCapacity: faker.number.int(10),
        soldNumber: faker.number.int(10),
        unlimitedQuantity: faker.helpers.arrayElement([true, false]),
        purchaseLimit: faker.number.int(10),
        description: faker.lorem.sentence(),
        purchaseDuplicate: faker.helpers.arrayElement([true, false]),
        ticketStatus: TicketStatusEnum.VALID,
      };

      mockTickets.push(mockTicket);
      await Ticket.create(mockTicket);
    }
    for (const ticket of mockTickets) {
      newActivity.totalParticipantCapacity += ticket.participantCapacity;
    }

    await newActivity.save();
  }
};

export const importMockKeyword = async () => {
  await Keyword.deleteMany({});
  await Keyword.insertMany(mockKeywords);
};

export const importMockUser = async () => {
  const imageIndex = [0, 12];
  for (const mockUser of mockUsers) {
    if (mockUser.gender === '女') {
      mockUser.profilePicture = mockProfilePictures[imageIndex[0]];
      imageIndex[0]++;
    } else {
      mockUser.profilePicture = mockProfilePictures[imageIndex[1]];
      imageIndex[1]++;
    }
  }
  await User.deleteMany({});
  await User.insertMany(mockUsers);
};

export const importMockOrganizer = async () => {
  for (const mockOrganizer of mockOrganizers) {
    const user = await User.findOne({
      realName: mockOrganizer.contactName,
    }).select({ profilePicture: 1 });
    if (user?.profilePicture)
      mockOrganizer.profilePicture = user.profilePicture;
  }
  await Organizer.deleteMany({});
  await Organizer.insertMany(mockOrganizers);
};

export const importMockComment = async () => {
  for (const mockComment of mockComments) {
    const randomUser: UserSchemaModel[] = await User.aggregate().sample(1);
    mockComment.userName = randomUser[0].displayName;
    mockComment.profilePicture = randomUser[0].profilePicture as string;
  }

  await Comment.deleteMany({});
  await Comment.insertMany(mockComments);
};

export const importMockActivity = async () => {
  const categoryUserIds: { [key: string]: object[] } = {
    戶外踏青: [],
    社交活動: [],
    興趣嗜好: [],
    運動健身: [],
    健康生活: [],
    科技玩物: [],
    藝術文化: [],
    遊戲: [],
  };
  const categoryUserNames: { [key: string]: string[] } = {
    戶外踏青: [],
    社交活動: [],
    興趣嗜好: [],
    運動健身: [],
    健康生活: [],
    科技玩物: [],
    藝術文化: [],
    遊戲: [],
  };
  const categoryImageData = {
    戶外踏青: outdoorImages,
    社交活動: socialImages,
    興趣嗜好: hobbiesImages,
    運動健身: sportsImages,
    健康生活: healthImages,
    科技玩物: technologyImages,
    藝術文化: artImages,
    遊戲: gamesImages,
  };
  const categoryImageIndex: { [key: string]: number } = {
    戶外踏青: 0,
    社交活動: 0,
    興趣嗜好: 0,
    運動健身: 0,
    健康生活: 0,
    科技玩物: 0,
    藝術文化: 0,
    遊戲: 0,
  };
  for (const mockUser of mockUsers) {
    const user = await User.findOne({ email: mockUser.email }).select({
      _id: 1,
      realName: 1,
    });
    if (user?._id && user?.realName) {
      categoryUserIds[mockUser.category].push(user._id);
      categoryUserNames[mockUser.category].push(user.realName);
    }
  }
  for (const mockActivity of mockActivities) {
    const randomNumber = faker.number.int(2);
    const organizer = await Organizer.findOne({
      contactName: categoryUserNames[mockActivity.category][randomNumber],
    });
    mockActivity.creatorId =
      categoryUserIds[mockActivity.category][randomNumber].toString();
    const temp = JSON.parse(JSON.stringify(organizer));
    mockActivity.organizer = temp;

    console.log(categoryImageData, categoryImageIndex);
    // categoryImageIndex[mockActivity.category]++;
    //     cover
    // thumbnail
  }
};
