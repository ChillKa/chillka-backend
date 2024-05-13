import { Schema } from 'mongoose';

export enum PaymentStatusEnum {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
  ERROR = 'ERROR',
}

export enum PaymentMethodEnum {
  CREDIT_CARD = 'CREDIT_CARD',
  CASH = 'CASH',
  SYSTEM_UPDATE = 'SYSTEM_UPDATE',
}

export enum TicketStatusEnum {
  VALID = 'VALID',
  CANCELLED = 'CANCELLED',
  USED = 'USED',
  HOLD = 'HOLD',
  ERROR = 'ERROR',
}

export interface TicketSchemaModel {
  userId: Schema.Types.ObjectId;
  activityId: Schema.Types.ObjectId;
  name: string;
  price: number;
  startDateTime: Date;
  fromToday: boolean;
  endDateTime: Date;
  noEndDate: boolean;
  participantCapacity: number;
  unlimitedQuantity: boolean;
  purchaseLimit: number;
  description: string;
  ticketsPurchaseDuplicate: boolean;
  paymentAmount: number;
  paymentStatus: PaymentStatusEnum;
  paymentMethod: PaymentMethodEnum;
  count: number;
  orderNumber: string;
  ticketStatus: TicketStatusEnum;
  serialNumber: string;
}
