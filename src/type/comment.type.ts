import mongoose from 'mongoose';

export enum TypeEnum {
  QUESTION = '提問',
  REPLY = '回覆',
}

export interface CommentSchemaModel {
  activityId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  commentId: mongoose.Types.ObjectId;
  displayName: string;
  content: string;
  type: TypeEnum;
}
