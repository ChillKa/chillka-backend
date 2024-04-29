import { Model, Schema, model } from 'mongoose';
import { validateEmail, validatePassword } from '../util/validator';

export interface IUser {
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: Schema.Types.String,
      required: true,
      validate: {
        validator: function (value: unknown) {
          return typeof value === 'string' ? validateEmail(value) : false;
        },
        message: (props) => `${props.value} is not a valid email`,
      },
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
      validate: {
        validator: function (value: unknown) {
          return typeof value === 'string' ? validatePassword(value) : false;
        },
        message: (props) => `${props.value} is not a valid password`,
      },
    },
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

const User: Model<IUser> = model<IUser>('User', UserSchema);

export default User;
