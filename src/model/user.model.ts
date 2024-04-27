import { Document, Model, Schema, model } from 'mongoose';

export type UserDocument = Document & {
  email: string;
  password: string;
};

export type UserInput = {
  email: UserDocument['email'];
  password: UserDocument['password'];
};

const UserSchema = new Schema(
  {
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

const User: Model<UserDocument> = model<UserDocument>('User', UserSchema);

export default User;
