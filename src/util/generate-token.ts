import jwt from 'jsonwebtoken';
import { UserBase } from '../type/user.type';

export const generateToken = (user: UserBase) =>
  jwt.sign(
    { id: user._id, username: user.displayName, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '30d' }
  );

export default generateToken;
