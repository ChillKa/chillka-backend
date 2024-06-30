import { faker } from '@faker-js/faker';
import {
  OrderStatusEnum,
  PaymentStatusEnum,
  PaymentTypeEnum,
} from '../../../type/order.type';

const orders = Array.from({ length: 10 }, (_, index) => ({
  userId: '',
  activityId: '',
  ticketId: '',
  orderContact: {
    name: '',
    email: '',
    phone: '',
  },
  payment: {
    amount: (Math.random() * 2000).toString(),
    status: PaymentStatusEnum.PAID,
    type: PaymentTypeEnum.Credit_CreditCard,
    orderNumber: index + 1,
  },
  orderStatus: OrderStatusEnum.VALID,
  transactionId: faker.string.uuid(),
  serialNumber: faker.string.uuid(),
}));

export default orders;
