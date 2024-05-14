import { Schema } from 'mongoose';

export interface MessageListSchemaModel {
  activityId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  question: string;
}
