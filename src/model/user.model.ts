import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import { Model, Schema, model } from 'mongoose';
import { GenderEnum, UserSchemaModel } from '../type/user.type';
import { validateEmail, validatePassword } from '../util/validator';

interface UserMethods {
  comparePassword(password: string): Promise<boolean>;
}
type UserModel = Model<UserSchemaModel, object, UserMethods>;

const UserSchema = new Schema<UserSchemaModel, UserModel, UserMethods>(
  {
    googleId: {
      type: Schema.Types.String,
    },
    displayName: {
      type: Schema.Types.String,
      required: true,
      minLength: 2,
      maxLength: 50,
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
      lowercase: true,
    },
    password: {
      type: Schema.Types.String,
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
      enum: GenderEnum,
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
      default: faker.helpers.fromRegExp(/09[0-9]{8}/),
    },
    phoneBarcode: {
      type: Schema.Types.String,
    },
    address: {
      type: Schema.Types.String,
    },
    isEmailValidate: {
      type: Schema.Types.Boolean,
      default: true,
    },
    savedActivities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
    favoriteCategories: {
      type: [Schema.Types.String],
      default: [],
    },
    profilePicture: {
      type: Schema.Types.String,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

UserSchema.virtual('activities', {
  ref: 'Activity',
  localField: '_id',
  foreignField: 'creatorId',
});

UserSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'userId',
});

UserSchema.virtual('questions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'userId',
});

UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch {
    return false;
  }
};

const User = model<UserSchemaModel, UserModel>('User', UserSchema);

export default User;
