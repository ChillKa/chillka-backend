import { Model, Schema, model } from 'mongoose';
import { QuestionSchemaModel, TypeEnum } from '../type/question.type';

type QuestionModel = Model<QuestionSchemaModel, object>;

const QuestionSchema = new Schema<QuestionSchemaModel, QuestionModel>(
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
    questionId: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
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
    replies: {
      type: [Object],
    },
    profilePicture: {
      type: Schema.Types.String,
    },
  },
  {
    collection: 'questions',
    timestamps: true,
  }
);

const Question = model<QuestionSchemaModel, QuestionModel>(
  'Question',
  QuestionSchema
);

export default Question;
