import { Model, Schema, model } from 'mongoose';
import { ReplySchemaModel } from '../type/reply.type';

type ReplyModel = Model<ReplySchemaModel, object>;

const ReplySchema = new Schema<ReplySchemaModel, ReplyModel>(
  {
    activityId: {
      type: Schema.Types.ObjectId,
      ref: 'Activity',
      required: true,
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    collection: 'replies',
    timestamps: true,
  }
);

const Reply = model<ReplySchemaModel, ReplyModel>('Reply', ReplySchema);

export default Reply;
