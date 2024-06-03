import { Model, Schema, model } from 'mongoose';
import { QuestionSchemaModel } from '../type/question.type';

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
    displayName: {
      type: Schema.Types.String,
      required: true,
    },
    content: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    collection: 'questions',
    timestamps: true,
  }
);

QuestionSchema.virtual('replies', {
  ref: 'Reply',
  localField: '_id',
  foreignField: 'questionId',
});

const Question = model<QuestionSchemaModel, QuestionModel>(
  'Question',
  QuestionSchema
);

export default Question;
