import mongoose from 'mongoose';

export enum GenderEnum {
  MALE = '男',
  FEMALE = '女',
}

export interface UserBase {
  displayName: string;
  email: string;
  password: string;
}

export interface UserSchemaModel extends UserBase {
  googleId?: string;
  realName?: string;
  birthday?: string;
  gender?: GenderEnum;
  age?: number;
  introduction?: string;
  phoneAreaCode?: string;
  phoneNumber?: string;
  phoneBarcode?: string;
  address?: string;
  isEmailValidate?: boolean;
  savedActivities?: mongoose.Types.ObjectId[];
  favoriteCategories: string[];
  profilePicture?: string;
}

export type UserRegisterCredentials = UserBase & {
  confirmPassword: string;
};

export type UserTokenCredentials = {
  _id: mongoose.Types.ObjectId;
  displayName: string;
  email: string;
};

export type UserLoginCredentials = Omit<UserBase, 'displayName'>;
export type UserEditCredentials = Omit<UserSchemaModel, 'password'>;

export type SendEmailCredentials = {
  email: string;
  emailType: 'resetPassword' | 'verifyEmail';
};

export type ResetPasswordCredentials = {
  token: string;
  password: string;
  confirmPassword: string;
};

export type ChangePasswordParams = {
  userId: mongoose.Types.ObjectId;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
export type ChangePasswordCredentials = Omit<ChangePasswordParams, 'userId'>;
