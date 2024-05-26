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
      required: true,
      default: 'chillka',
    },
    price: {
      type: Schema.Types.Number,
      required: true,
      default: 0,
    },
    startDateTime: {
      type: Schema.Types.Date,
    },
    fromToday: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    endDateTime: {
      type: Schema.Types.Date,
    },
    noEndDate: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    participantCapacity: {
      type: Schema.Types.Number,
      required: true,
    },
    unlimitedQuantity: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    purchaseLimit: {
      type: Schema.Types.Number,
    },
    description: {
      type: Schema.Types.String,
    },
    purchaseDuplicate: {
      type: Schema.Types.Boolean,
    },
    paymentAmount: {
      type: Schema.Types.Number,
    },
    paymentStatus: {
      type: Schema.Types.String,
      enum: PaymentStatusEnum,
    },
    paymentMethod: {
      type: Schema.Types.String,
      enum: PaymentMethodEnum,
    },
    count: {
      type: Schema.Types.Number,
    },
    orderNumber: {
      type: Schema.Types.String,
    },
    ticketStatus: {
      type: Schema.Types.String,
      enum: TicketStatusEnum,
      required: true,
      default: TicketStatusEnum.VALID,
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
