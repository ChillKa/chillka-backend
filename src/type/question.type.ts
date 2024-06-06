import mongoose from 'mongoose';

export interface QuestionSchemaModel {
  activityId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  displayName: string;
  content: string;
}
