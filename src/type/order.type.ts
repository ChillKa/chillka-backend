import mongoose from 'mongoose';

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

export enum OrderStatusEnum {
  VALID = '有效',
  CANCELLED = '取消',
  USED = '已使用',
  HOLD = '保留',
  ERROR = '無效票券',
}

export type OrderPayment = {
  amount: number;
  status: PaymentStatusEnum;
  method: PaymentMethodEnum;
  orderNumber: number;
};

export interface OrderSchemaModel {
  userId: mongoose.Types.ObjectId;
  activityId: mongoose.Types.ObjectId;
  ticketId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  startDateTime: Date;
  endDateTime: Date;
  payment: OrderPayment;
  orderStatus: OrderStatusEnum;
  serialNumber: string;
}
