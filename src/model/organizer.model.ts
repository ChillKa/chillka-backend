import { Model, Schema, model } from 'mongoose';
import { OrganizerSchemaModel } from '../type/organizer.type';

type OrganizerModel = Model<OrganizerSchemaModel, object>;

const OrganizerSchema = new Schema<OrganizerSchemaModel, OrganizerModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    profilePicture: {
      type: Schema.Types.String,
    },
    name: {
      type: Schema.Types.String,
      required: true,
    },
    contactName: {
      type: Schema.Types.String,
      required: true,
    },
    contactPhone: {
      type: Schema.Types.String,
    },
    contactEmail: {
      type: Schema.Types.String,
      required: true,
    },
    websiteName: {
      type: Schema.Types.String,
    },
    websiteURL: {
      type: Schema.Types.String,
    },
  },
  {
    collection: 'organizers',
    timestamps: true,
  }
);

OrganizerSchema.virtual('activityId', {
  ref: 'Activity',
  localField: '_id',
  foreignField: 'organizerId',
});

const Organizer = model<OrganizerSchemaModel, OrganizerModel>(
  'Organizer',
  OrganizerSchema
);

export default Organizer;
