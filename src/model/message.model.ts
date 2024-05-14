import { Model, Schema, model } from 'mongoose';
import { MessageSchemaModel } from '../type/message.type';

type MessageModel = Model<MessageSchemaModel, object>;

const MessageSchema = new Schema<MessageSchemaModel, MessageModel>(
  {
    messageListId: {
      type: Schema.Types.ObjectId,
      ref: 'MessageList',
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    answer: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    collection: 'messages',
    timestamps: true,
  }
);

const Message = model<MessageSchemaModel, MessageModel>(
  'Message',
  MessageSchema
);

export default Message;
