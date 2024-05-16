import mongoose from 'mongoose';

export interface MessageSchemaModel {
  messageListId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  answer: string;
}
