import { Model, Schema, model } from 'mongoose';
import {
  OrderSchemaModel,
  OrderStatusEnum,
  PaymentStatusEnum,
  PaymentTypeEnum,
} from '../type/order.type';

type OrderModel = Model<OrderSchemaModel, object>;

const OrderSchema = new Schema<OrderSchemaModel, OrderModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    activityId: {
      type: Schema.Types.ObjectId,
      ref: 'Activity',
      required: true,
    },
    ticketId: {
      type: Schema.Types.ObjectId,
      ref: 'Ticket',
      required: true,
    },
    orderContact: {
      name: {
        type: Schema.Types.String,
        required: true,
      },
      email: {
        type: Schema.Types.String,
        required: true,
      },
      phone: {
        type: Schema.Types.String,
        required: true,
      },
    },
    payment: {
      amount: {
        type: Schema.Types.String,
        required: true,
      },
      status: {
        type: Schema.Types.String,
        enum: PaymentStatusEnum,
        default: PaymentStatusEnum.UNPAID,
      },
      type: {
        type: Schema.Types.String,
        enum: PaymentTypeEnum,
        default: undefined,
      },
      orderNumber: {
        type: Schema.Types.Number,
        required: true,
      },
    },
    orderStatus: {
      type: Schema.Types.String,
      enum: OrderStatusEnum,
      default: OrderStatusEnum.VALID,
    },
    transactionId: {
      type: Schema.Types.String,
    },
    serialNumber: {
      type: Schema.Types.String,
    },
  },
  {
    collection: 'orders',
    timestamps: true,
  }
);

const Order = model<OrderSchemaModel, OrderModel>('Order', OrderSchema);

export default Order;
