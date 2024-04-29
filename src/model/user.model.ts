import bcrypt from 'bcryptjs';
import { Model, Schema, model } from 'mongoose';
import { validateEmail, validatePassword } from '../util/validator';

interface IUser {
  email: string;
  password: string;
}

interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, object, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
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

UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch {
    return false;
  }
};

const User = model<IUser, UserModel>('User', UserSchema);

export default User;
