import { Model, Schema, model } from 'mongoose';
import { TypeEnum, CommentSchemaModel } from '../type/comment.type';

type CommentModel = Model<CommentSchemaModel, object>;

const CommentSchema = new Schema<CommentSchemaModel, CommentModel>(
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
    commentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
    displayName: {
      type: Schema.Types.String,
      required: true,
    },
    type: {
      type: Schema.Types.String,
      enum: TypeEnum,
      required: true,
      default: TypeEnum.QUESTION,
    },
    content: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    collection: 'comments',
    timestamps: true,
  }
);

const Comment = model<CommentSchemaModel, CommentModel>(
  'Comment',
  CommentSchema
);

export default Comment;
