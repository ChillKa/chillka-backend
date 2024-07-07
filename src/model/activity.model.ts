import { Model, Schema, model } from 'mongoose';
import {
  ActivitySchemaModel,
  CategoryEnum,
  DayEnum,
  LocationEnum,
  PeriodEnum,
  StatusEnum,
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
      enum: LocationEnum,
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
      default: false,
    },
    displayRemainingTickets: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    remainingTickets: {
      type: Schema.Types.Number,
    },
    isRecurring: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
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
    status: {
      type: Schema.Types.String,
      enum: StatusEnum,
      required: true,
      default: StatusEnum.VALID,
    },
    lat: {
      type: Schema.Types.Number,
    },
    lng: {
      type: Schema.Types.Number,
    },
    saved: {
      type: Schema.Types.Boolean,
      default: false,
    },
    participated: {
      type: Schema.Types.Boolean,
      default: false,
    },
    totalParticipantCapacity: {
      type: Schema.Types.Number,
      default: 0,
    },
    unlimitedQuantity: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    participantAmount: {
      type: Schema.Types.Number,
      default: 0,
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

ActivitySchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'activityId',
});

ActivitySchema.virtual('questions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'activityId',
});

const Activity = model<ActivitySchemaModel, ActivityModel>(
  'Activity',
  ActivitySchema
);

export default Activity;
