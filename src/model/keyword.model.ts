import { Model, Schema, model } from 'mongoose';
import { KeywordSchemaModel } from '../type/keyword.type';

type KeywordModel = Model<KeywordSchemaModel, object>;

const KeywordSchema = new Schema<KeywordSchemaModel, KeywordModel>(
  {
    content: {
      type: Schema.Types.String,
      required: true,
    },
    count: {
      type: Schema.Types.Number,
      required: true,
      default: 0,
    },
  },
  {
    collection: 'keywords',
    timestamps: true,
  }
);

const Keyword = model<KeywordSchemaModel, KeywordModel>(
  'Keyword',
  KeywordSchema
);

export default Keyword;
