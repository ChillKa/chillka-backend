import mongoose from 'mongoose';

export enum MessageUserType {
  HOST = '舉辦者',
  PARTICIPANT = '參加者',
}

export interface MessageSchemaModel {
  userType: MessageUserType;
  content: string;
  receiverIsRead?: boolean;
}

export interface MessageListSchemaModel {
  orderId: mongoose.Types.ObjectId;
  hostUserId: mongoose.Types.ObjectId;
  participantUserId: mongoose.Types.ObjectId;
  messages: MessageSchemaModel[];
}

export type GetMessageListIdParams = {
  orderId: string;
  hostUserId: string;
  participantUserId: string;
};

export type GetMessageListParams = {
  userId: mongoose.Types.ObjectId | undefined;
  page?: number;
  limit?: number;
};

export type LiveMessageParams = MessageListSchemaModel;

export type SocketQueryParams = {
  userId: string;
  messageListId: string;
};
