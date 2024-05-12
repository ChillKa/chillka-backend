import bcrypt from 'bcryptjs';
import { Model, Schema, model } from 'mongoose';
import { Gender, UserSchemaModel } from '../type/user.type';
import { validateEmail, validatePassword } from '../util/validator';

interface UserMethods {
  comparePassword(password: string): Promise<boolean>;
}
type UserModel = Model<UserSchemaModel, object, UserMethods>;

const UserSchema = new Schema<UserSchemaModel, UserModel, UserMethods>(
  {
    displayName: {
      type: Schema.Types.String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
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
    realName: {
      type: Schema.Types.String,
    },
    birthday: {
      type: Schema.Types.String,
    },
    gender: {
      type: Schema.Types.String,
      enum: Gender,
    },
    age: {
      type: Schema.Types.Number,
    },
    introduction: {
      type: Schema.Types.String,
    },
    phoneAreaCode: {
      type: Schema.Types.String,
    },
    phoneNumber: {
      type: Schema.Types.String,
    },
    phoneBarcode: {
      type: Schema.Types.String,
    },
    address: {
      type: Schema.Types.String,
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

const User = model<UserSchemaModel, UserModel>('User', UserSchema);

export default User;
