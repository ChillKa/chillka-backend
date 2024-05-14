import { Schema } from 'mongoose';

export enum PaymentStatusEnum {
  PAID = '已付款',
  UNPAID = '待付款',
  ERROR = '付款失敗',
}

export enum PaymentMethodEnum {
  CREDIT_CARD = '信用卡',
  CASH = '現金',
  SYSTEM_UPDATE = '系統更新',
}

export enum TicketStatusEnum {
  VALID = '有效',
  CANCELLED = '取消',
  USED = '已使用',
  HOLD = '保留',
  ERROR = '無效票券',
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
