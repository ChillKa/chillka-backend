import mongoose from 'mongoose';

export enum TypeEnum {
  QUESTION = '提問',
  REPLY = '回覆',
}

export interface QuestionSchemaModel {
  _id: mongoose.Types.ObjectId;
  activityId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
  displayName: string;
  content: string;
  type: TypeEnum;
  replies: QuestionSchemaModel[];
  profilePicture?: string;
}
