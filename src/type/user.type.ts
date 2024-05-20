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
  phoneAreaCode?: number;
  phoneNumber?: number;
  phoneBarcode?: string;
  address?: string;
}

export type UserRegisterCredentials = UserBase & {
  confirmPassword: string;
};

// _id add string property because the passport request is possible to be undefined
export type UserTokenCredentials = {
  _id: mongoose.Types.ObjectId | string;
  displayName: string;
  email: string;
};

export type UserLoginCredentials = Omit<UserBase, 'displayName'>;
export type UserEditCredentials = Omit<UserSchemaModel, 'password'>;
