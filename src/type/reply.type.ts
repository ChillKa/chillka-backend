import mongoose from 'mongoose';

export interface ReplySchemaModel {
  activityId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  content: string;
}
