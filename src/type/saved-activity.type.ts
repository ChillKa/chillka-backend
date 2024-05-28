import mongoose from 'mongoose';

export interface SavedActivitySchemaModel {
  userId: mongoose.Types.ObjectId;
  activityId: mongoose.Types.ObjectId;
}
