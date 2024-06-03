import { Model, Schema, model } from 'mongoose';
import { MessageListSchemaModel } from '../type/message-list.type';

type MessageListModel = Model<MessageListSchemaModel, object>;

const MessageListSchema = new Schema<MessageListSchemaModel, MessageListModel>(
  {
    activityId: {
      type: Schema.Types.ObjectId,
      ref: 'Activity',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    displayName: {
      type: Schema.Types.String,
      required: true,
    },
    question: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    collection: 'messageLists',
    timestamps: true,
  }
);

MessageListSchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'messageListId',
});

const MessageList = model<MessageListSchemaModel, MessageListModel>(
  'MessageList',
  MessageListSchema
);

export default MessageList;
