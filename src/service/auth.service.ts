import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/user.model';
import {
  UserLoginCredentials,
  UserRegisterCredentials,
} from '../type/user.type';
import { CoreError } from '../util/error-handler';

export const register = async ({
  email,
  password,
  displayName,
}: UserRegisterCredentials) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new CoreError('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword, displayName });
  try {
    await user.save();

    return 'Register successed';
  } catch {
    throw new CoreError('Register failed.');
  }
};

export const login = async ({ email, password }: UserLoginCredentials) => {
  const user = await User.findOne({ email });
  if (!user) throw new CoreError('User not found');

  if (!(await user.comparePassword(password)))
    throw new CoreError(`Wrong password`);

  const token = jwt.sign(
    { id: user._id, username: user.displayName },
    process.env.JWT_SECRET!
  );
  const userId = user._id;
  const data = { token, userId };

  return data;
};
