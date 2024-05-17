export enum GenderEnum {
  MALE = '男',
  FEMALE = '女',
}
export interface UserBase {
  _id?: string;
  displayName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface UserSchemaModel extends UserBase {
  realName?: string;
  birthday?: string;
  gender?: 'MALE' | 'FEMALE';
  age?: number;
  introduction?: string;
  phoneAreaCode?: number;
  phoneNumber?: number;
  phoneBarcode?: string;
  address?: string;
}

export type UserRegisterCredentials = UserBase;
export type UserLoginCredentials = Omit<UserBase, 'displayName'>;
export type UserEditCredentials = Omit<UserSchemaModel, 'password'>;
