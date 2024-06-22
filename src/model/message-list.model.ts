import { Model, Schema, model } from 'mongoose';
import {
  MessageListSchemaModel,
  MessageSchemaModel,
  MessageUserType,
} from '../type/message-list.type';

type Message = Model<MessageSchemaModel, object>;
type MessageListModel = Model<MessageListSchemaModel, object>;

const Message = new Schema<MessageSchemaModel, Message>(
  {
    userType: {
      type: Schema.Types.String,
      enum: MessageUserType,
      required: true,
    },
    content: {
      type: Schema.Types.String,
      required: true,
    },
    receiverIsRead: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  {
    collection: 'messages',
    timestamps: true,
  }
);

const MessageListSchema = new Schema<MessageListSchemaModel, MessageListModel>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    hostUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    participantUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    messages: {
      type: [Message],
    },
  },
  {
    collection: 'message-lists',
    timestamps: true,
  }
);

const MessageList = model<MessageListSchemaModel, MessageListModel>(
  'MessageList',
  MessageListSchema
);

export default MessageList;
