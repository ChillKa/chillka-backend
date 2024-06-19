import mongoose from 'mongoose';
import { SortType } from './model.type';
import { OrganizerBase } from './organizer.type';
import { QuestionSchemaModel } from './question.type';
import { TicketSchemaModel } from './ticket.type';

export enum CategoryEnum {
  OUTDOOR = '戶外踏青',
  SOCIAL = '社交活動',
  HOBBIES = '興趣嗜好',
  SPORTS = '運動健身',
  HEALTH = '健康生活',
  TECHNOLOGY = '科技玩物',
  ART = '藝術文化',
  GAMES = '遊戲',
}

export enum TypeEnum {
  ONLINE = '線上',
  INDOOR = '室內',
  OUTDOOR = '室外',
}

export enum LocationEnum {
  NORTH = '北部',
  CENTRAL = '中部',
  SOUTH = '南部',
  EAST = '東部',
  ISLAND = '離島',
}

export enum PeriodEnum {
  WEEK = '隔週',
  MONTH = '每月',
  SEASON = '每季',
}

export enum WeekEnum {
  WEEKLY = '每週',
  OTHERWEEK = '隔週',
  FIRST = '第一週',
  SECOND = '第二週',
  THIRD = '第三週',
  FOURTH = '第四週',
  LAST = '最後一週',
}

export enum DayEnum {
  MONDAY = '星期一',
  TUESDAY = '星期二',
  WEDNESDAY = '星期三',
  THURSDAY = '星期四',
  FRIDAY = '星期五',
  SATURDAY = '星期六',
  SUNDAY = '星期日',
}

export enum StatusEnum {
  VALID = '有效',
  CANCELLED = '取消',
  END = '結束',
}

export interface Recurring {
  period: PeriodEnum;
  week: WeekEnum;
  day: DayEnum;
}

export interface ActivitySchemaModel {
  creatorId: mongoose.Types.ObjectId;
  name: string;
  organizer: OrganizerBase;
  cover: string[];
  thumbnail: string;
  startDateTime?: Date;
  fromToday: boolean;
  endDateTime?: Date;
  noEndDate: boolean;
  category: CategoryEnum;
  type: TypeEnum;
  link: string;
  location: string;
  address: string;
  summary: string;
  details: string;
  isPrivate: boolean;
  displayRemainingTickets: boolean;
  remainingTickets: number;
  isRecurring: boolean;
  recurring: Recurring;
  status: StatusEnum;
  tickets: TicketSchemaModel[];
  questions: QuestionSchemaModel[];
  lat: number;
  lng: number;
  saved: boolean;
  participated: boolean;
  participantCapacity: number;
  unlimitedQuantity: boolean;
}

export type ActivityCreateParams = ActivitySchemaModel;
export type ActivityCreateCredentials = Omit<ActivitySchemaModel, 'creatorId'>;

type EditableActivity = Omit<ActivitySchemaModel, 'creatorId' | 'questions'>;

export type ActivityEditParams = EditableActivity & {
  userId: mongoose.Types.ObjectId | undefined;
  activityId: mongoose.Types.ObjectId;
};

export type ActivityEditCredentials = EditableActivity;

export type GetActivitiesParams = {
  userId: mongoose.Types.ObjectId | undefined;
  page?: number;
  limit?: number;
  sort?: SortType;
};

export type GetActivityDetailCredential = {
  activityId: mongoose.Types.ObjectId;
  userId?: string;
};

export type GetActivityParticipantParams = {
  activityId: mongoose.Types.ObjectId | undefined;
  participantName?: string;
  page?: number;
  limit?: number;
  sort?: SortType;
};

export type CancelActivityParams = {
  userId: mongoose.Types.ObjectId | undefined;
  activityId: mongoose.Types.ObjectId;
};

export type CollectActivityParams = {
  userId: mongoose.Types.ObjectId | undefined;
  activityId: mongoose.Types.ObjectId;
};

export type GetSavedActivityParams = {
  userId: mongoose.Types.ObjectId | undefined;
  page?: number;
  limit?: number;
  sort?: SortType;
};

export type QuestionCredentials = {
  userId: mongoose.Types.ObjectId;
  activityId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
  type?: string;
  content?: string;
};

export type replyObject = {
  [key: string]: QuestionSchemaModel[];
};
export type GetActivitiesCredentials = Omit<GetSavedActivityParams, 'userId'>;

export type ImageFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  path: string;
  size: number;
  filename: string;
};

export type GetRecommendActivitiesCredential = {
  userId?: string;
  limit: number;
};
