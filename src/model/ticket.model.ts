import { Model, Schema, model } from 'mongoose';
import {
  PaymentMethodEnum,
  PaymentStatusEnum,
  TicketSchemaModel,
  TicketStatusEnum,
} from '../type/ticket.type';

type TicketModel = Model<TicketSchemaModel, object>;

const TicketSchema = new Schema<TicketSchemaModel, TicketModel>(
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
    name: {
      type: Schema.Types.String,
    },
    price: {
      type: Schema.Types.Number,
    },
    startDateTime: {
      type: Schema.Types.Date,
    },
    fromToday: {
      type: Schema.Types.Boolean,
    },
    endDateTime: {
      type: Schema.Types.Date,
    },
    noEndDate: {
      type: Schema.Types.Boolean,
    },
    participantCapacity: {
      type: Schema.Types.Number,
    },
    unlimitedQuantity: {
      type: Schema.Types.Boolean,
    },
    purchaseLimit: {
      type: Schema.Types.Number,
    },
    description: {
      type: Schema.Types.String,
    },
    ticketsPurchaseDuplicate: {
      type: Schema.Types.Boolean,
    },
    userInfo: {
      name: {
        type: Schema.Types.String,
      },
      email: {
        type: Schema.Types.String,
      },
      phone: {
        type: Schema.Types.String,
      },
    },
    payment: {
      amount: {
        type: Schema.Types.Number,
      },
      status: {
        type: Schema.Types.String,
        enum: PaymentStatusEnum,
      },
      method: {
        type: Schema.Types.String,
        enum: PaymentMethodEnum,
      },
      orderNumber: {
        type: Schema.Types.Number,
      },
    },
    ticketStatus: {
      type: Schema.Types.String,
      enum: TicketStatusEnum,
    },
    serialNumber: {
      type: Schema.Types.String,
    },
  },
  {
    collection: 'tickets',
    timestamps: true,
  }
);

const Ticket = model<TicketSchemaModel, TicketModel>('Ticket', TicketSchema);

export default Ticket;
