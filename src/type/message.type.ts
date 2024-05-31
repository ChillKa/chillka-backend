import mongoose from 'mongoose';

export interface MessageSchemaModel {
  activityId: mongoose.Types.ObjectId;
  messageListId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  answer: string;
}
