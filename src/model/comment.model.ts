import { Model, Schema, model } from 'mongoose';
import { CommentSchemaModel } from '../type/comment.type';

type CommentModel = Model<CommentSchemaModel, object>;

const CommentSchema = new Schema<CommentSchemaModel, CommentModel>(
  {
    profilePicture: {
      type: Schema.Types.String,
    },
    userName: {
      type: Schema.Types.String,
      required: true,
    },
    date: {
      type: Schema.Types.Date,
      required: true,
    },
    content: {
      type: Schema.Types.String,
      required: true,
    },
    activityName: {
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
