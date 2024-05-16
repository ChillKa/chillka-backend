import mongoose from 'mongoose';

export interface MessageListSchemaModel {
  activityId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  question: string;
}
