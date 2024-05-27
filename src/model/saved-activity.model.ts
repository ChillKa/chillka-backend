import { Model, Schema, model } from 'mongoose';
import { SavedActivitySchemaModel } from '../type/saved-activity.type';

type SavedActivityModel = Model<SavedActivitySchemaModel, object>;

const SavedActivitySchema = new Schema<
  SavedActivitySchemaModel,
  SavedActivityModel
>(
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
  },
  {
    collection: 'savedActivities',
    timestamps: true,
  }
);

const SavedActivity = model<SavedActivitySchemaModel, SavedActivityModel>(
  'SavedActivity',
  SavedActivitySchema
);

export default SavedActivity;
