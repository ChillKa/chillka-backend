import mongoose from 'mongoose';

export enum TicketStatusEnum {
  VALID = '可購買',
  SOLD_OUT = '已售完',
  CANCELLED = '結束售票',
}

export interface TicketSchemaModel {
  _id?: mongoose.Types.ObjectId;
  activityId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  startDateTime?: Date;
  fromToday: boolean;
  endDateTime?: Date;
  noEndDate: boolean;
  participantCapacity: number;
  soldNumber: number;
  unlimitedQuantity: boolean;
  purchaseLimit: number;
  description: string;
  purchaseDuplicate: boolean;
  ticketStatus: TicketStatusEnum;
}

export type EditableTicket = Omit<TicketSchemaModel, '_id' | 'activityId'>;
