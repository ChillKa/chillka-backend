import { UserTokenCredentials } from './user.type';

export enum SortEnum {
  ASC = 'asc',
  DES = 'des',
}

export interface AuthDecoded extends UserTokenCredentials {
  int: number;
  exp: number;
}

export type SortType = 'asc' | 'des';
