import mongoose from 'mongoose';

export enum MessageUserType {
  HOST = '舉辦者',
  PARTICIPANT = '參加者',
}

export interface MessageSchemaModel {
  userType: MessageUserType;
  content: string;
}

export interface MessageListSchemaModel {
  orderId: mongoose.Types.ObjectId;
  hostUserId: mongoose.Types.ObjectId;
  participantUserId: mongoose.Types.ObjectId;
  messages: MessageSchemaModel[];
}

export type GetMessageListParams = {
  orderId: mongoose.Types.ObjectId;
  hostUserId: mongoose.Types.ObjectId;
  participantUserId: mongoose.Types.ObjectId;
};

export type LiveMessageParams = MessageListSchemaModel;
