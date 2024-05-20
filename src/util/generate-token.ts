import jwt from 'jsonwebtoken';
import { UserTokenCredentials } from '../type/user.type';

export const generateToken = ({
  _id,
  displayName,
  email,
}: UserTokenCredentials) => {
  const token = { _id, displayName, email };

  return jwt.sign(token, process.env.JWT_SECRET!, { expiresIn: '1d' });
};

export default generateToken;
