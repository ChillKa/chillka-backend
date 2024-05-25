import mongoose from 'mongoose';
import { SortType } from './model.type';
import { OrganizerBase } from './organizer.type';

export enum CategoryEnum {
  Outdoor = '戶外踏青',
  Social = '社交活動',
  Hobbies = '興趣嗜好',
  Sports = '運動健身',
  Health = '健康生活',
  Technology = '科技玩物',
  Art = '藝術文化',
  Games = '遊戲',
}

export enum TypeEnum {
  OFFLINE = '線下',
  ONLINE = '線上',
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
  WENDNESDAY = '星期三',
  THURSDAY = '星期四',
  FRIDAY = '星期五',
  SATURDAY = '星期六',
  SUNDAY = '星期日',
}

export enum TicketModeEnum {
  CHILLKA = '揪咖',
  SALE = '售票',
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
  startDateTime: Date;
  fromToday: boolean;
  endDateTime: Date;
  noEndDate: boolean;
  price: number;
  category: CategoryEnum;
  type: TypeEnum;
  link: string;
  location: string;
  address: string;
  summary: string;
  details: string;
  isPrivate: boolean;
  displayRemainingTickets: boolean;
  isRecurring: boolean;
  recurring: Recurring;
  ticketMode: TicketModeEnum;
  status: StatusEnum;
  customField: boolean;
  ticketRequired: boolean;
}

export type ActivityCreateCredentials = Omit<
  ActivitySchemaModel,
  'creatorId'
> & {
  organizer: OrganizerBase;
};

export type GetActivitiesParams = {
  userId: mongoose.Types.ObjectId | undefined;
  page?: number;
  limit?: number;
  sort?: SortType;
};

export type CancelActivityParams = {
  userId: mongoose.Types.ObjectId | undefined;
  activityId: mongoose.Types.ObjectId;
};
