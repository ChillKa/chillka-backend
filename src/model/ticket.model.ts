import { Model, Schema, model } from 'mongoose';
import { TicketSchemaModel, TicketStatusEnum } from '../type/ticket.type';

type TicketModel = Model<TicketSchemaModel, object>;

const TicketSchema = new Schema<TicketSchemaModel, TicketModel>(
  {
    activityId: {
      type: Schema.Types.ObjectId,
      ref: 'Activity',
      required: true,
    },
    name: {
      type: Schema.Types.String,
      required: true,
      default: '啾咖',
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
    soldNumber: {
      type: Schema.Types.Number,
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
      required: true,
      default: false,
    },
    ticketStatus: {
      type: Schema.Types.String,
      enum: TicketStatusEnum,
      default: TicketStatusEnum.VALID,
      required: true,
    },
  },
  {
    collection: 'tickets',
    timestamps: true,
  }
);

TicketSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'ticketId',
});

const Ticket = model<TicketSchemaModel, TicketModel>('Ticket', TicketSchema);

export default Ticket;
