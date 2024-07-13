import mongoose from 'mongoose';
import { SortType } from './model.type';

export enum PaymentStatusEnum {
  PAID = '已付款',
  UNPAID = '待付款',
  ERROR = '付款失敗',
  FREE = '免付款',
}
// https://developers.ecpay.com.tw/?p=5686
export enum PaymentTypeEnum {
  FREE = '免付款',
  WebATM_TAISHIN = '台新銀行WebATM',
  WebATM_BOT = '台灣銀行WebATM',
  WebATM_CHINATRUST = '中國信託WebATM',
  WebATM_FIRST = '第一銀行WebATM',
  WebATM_LAND = '土地銀行WebATM',
  ATM_BOT = '台灣銀行ATM',
  ATM_CHINATRUST = '中國信託ATM',
  ATM_FIRST = '第一銀行ATM',
  ATM_LAND = '土地銀行ATM',
  ATM_CATHAY = '國泰世華ATM',
  ATM_PANHSIN = '板信銀行ATM',
  CVS_CVS = '超商代碼繳款',
  CVS_OK = 'OK超商代碼繳款',
  CVS_FAMILY = '全家超商代碼繳款',
  CVS_HILIFE = '萊爾富超商代碼繳款',
  CVS_IBON = '7-11 ibon代碼繳款',
  BARCODE_BARCODE = '超商條碼繳款',
  Credit_CreditCard = '信用卡',
  Flexible_Installment = '圓夢彈性分期',
  TWQR_OPAY = '歐付寶TWQR 行動支付',
  BNPL_URICH = '裕富數位無卡分期',
}

export enum OrderStatusEnum {
  VALID = '有效',
  CANCELLED = '取消',
  USED = '已使用',
  HOLD = '保留',
  ERROR = '無效票券',
}

export type OrderContact = {
  name: string;
  email: string;
  phone: string;
};

export type OrderPayment = {
  amount: string;
  status?: PaymentStatusEnum;
  type?: PaymentTypeEnum;
  orderNumber: number;
};

export interface OrderSchemaModel {
  userId: mongoose.Types.ObjectId;
  activityId: mongoose.Types.ObjectId;
  ticketId: mongoose.Types.ObjectId;
  orderContact: OrderContact;
  payment: OrderPayment;
  orderStatus: OrderStatusEnum;
  transactionId: string;
  serialNumber: string;
}

export type CreateOrderParams = {
  userId: mongoose.Types.ObjectId;
  requestBody: Pick<
    OrderSchemaModel,
    'activityId' | 'ticketId' | 'orderContact' | 'payment' | 'transactionId'
  >;
};

export type GetOrdersParams = {
  userId?: mongoose.Types.ObjectId;
  page?: number;
  limit?: number;
  sort?: SortType;
};

export type CancelOrderParams = {
  userId: mongoose.Types.ObjectId | undefined;
  orderId: mongoose.Types.ObjectId;
};

export type UseSerialNumberOrderParams = {
  userId: mongoose.Types.ObjectId | undefined;
  serialNumber: string;
};
