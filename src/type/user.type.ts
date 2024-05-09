export interface IUser {
  displayName: string;
  email: string;
  password: string;
}

export interface UserSchemaModel extends IUser {
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

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
