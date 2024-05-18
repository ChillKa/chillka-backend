import { UserBase } from '../../type/user.type';

export {};

declare global {
  namespace Express {
    interface User extends UserBase {
      id?: string;
    }
  }
}
