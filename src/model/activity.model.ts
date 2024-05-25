import { Model, Schema, model } from 'mongoose';
import {
  ActivitySchemaModel,
  CategoryEnum,
  DayEnum,
  PeriodEnum,
  StatusEnum,
  TicketModeEnum,
  TypeEnum,
  WeekEnum,
} from '../type/activity.type';
import Organizer from './organizer.model';

type ActivityModel = Model<ActivitySchemaModel, object>;

const ActivitySchema = new Schema<ActivitySchemaModel, ActivityModel>(
  {
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: Schema.Types.String,
      required: true,
    },
    organizer: {
      type: Organizer.schema,
      required: true,
    },
    cover: {
      type: [Schema.Types.String],
      required: true,
    },
    thumbnail: {
      type: Schema.Types.String,
      required: true,
    },
    startDateTime: {
      type: Schema.Types.Date,
    },
    fromToday: {
      type: Schema.Types.Boolean,
      required: true,
    },
    endDateTime: {
      type: Schema.Types.Date,
    },
    noEndDate: {
      type: Schema.Types.Boolean,
      required: true,
    },
    price: {
      type: Schema.Types.Number,
      required: true,
    },
    category: {
      type: Schema.Types.String,
      enum: CategoryEnum,
      required: true,
    },
    type: {
      type: Schema.Types.String,
      enum: TypeEnum,
      required: true,
    },
    link: {
      type: Schema.Types.String,
    },
    location: {
      type: Schema.Types.String,
    },
    address: {
      type: Schema.Types.String,
    },
    summary: {
      type: Schema.Types.String,
      required: true,
    },
    details: {
      type: Schema.Types.String,
      required: true,
    },
    isPrivate: {
      type: Schema.Types.Boolean,
      required: true,
    },
    displayRemainingTickets: {
      type: Schema.Types.Boolean,
      required: true,
    },
    isRecurring: {
      type: Schema.Types.Boolean,
      required: true,
    },
    recurring: {
      period: {
        type: Schema.Types.String,
        enum: PeriodEnum,
      },
      week: {
        type: Schema.Types.String,
        enum: WeekEnum,
      },
      day: {
        type: Schema.Types.String,
        enum: DayEnum,
      },
    },
    ticketMode: {
      type: Schema.Types.String,
      enum: TicketModeEnum,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      enum: StatusEnum,
      required: true,
      default: StatusEnum.VALID,
    },
    customField: {
      type: Schema.Types.Boolean,
    },
    ticketRequired: {
      type: Schema.Types.Boolean,
    },
  },
  {
    collection: 'activities',
    timestamps: true,
  }
);

ActivitySchema.virtual('tickets', {
  ref: 'Ticket',
  localField: '_id',
  foreignField: 'activityId',
});

ActivitySchema.virtual('messageLists', {
  ref: 'MessageList',
  localField: '_id',
  foreignField: 'activityId',
});

const Activity = model<ActivitySchemaModel, ActivityModel>(
  'Activity',
  ActivitySchema
);

export default Activity;
