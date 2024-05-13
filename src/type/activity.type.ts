import { Mixed, Schema } from 'mongoose';

export enum CategoryEnum {
  Travel_and_Outdoor = 'Travel and Outdoor',
  Social_Activities = 'Social Activities',
  Hobbies_and_Passions = 'Hobbies and Passions',
  Sports_and_Fitness = 'Sports and Fitness',
  Health_and_Wellbeing = 'Health and Wellbeing',
  Technology = 'Technology',
  Art_and_Culture = 'Art and Culture',
  Games = 'Games',
}

export enum TypeEnum {
  MALE = 'OFFLINE',
  FEMALE = 'ONLINE',
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
  CHILLKA = 'CHILLKA',
  SALE = 'SALE',
}

export enum StatusEnum {
  VALID = 'VALID',
  CANCELLED = 'CANCELLED',
  END = 'END',
}

export interface ActivitySchemaModel {
  organizerId: Schema.Types.ObjectId;
  cover: Schema.Types.Array;
  thumbnail: string;
  name: string;
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
  recurring: Mixed;
  ticketMode: TicketModeEnum;
  status: StatusEnum;
  customField: boolean;
  ticketRequired: boolean;
  participantAmount: number;
  checkedInParticipantsAmount: number;
}
