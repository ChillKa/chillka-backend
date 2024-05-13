import { Schema } from 'mongoose';

export interface MessageSchemaModel {
  messageListId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  answer: string;
}
