import bcrypt from 'bcryptjs';
import User from '../model/user.model';
import {
  UserLoginCredentials,
  UserRegisterCredentials,
  UserTokenCredentials,
} from '../type/user.type';
import { CoreError } from '../util/error-handler';
import generateToken from '../util/generate-token';

export const register = async ({
  email,
  password,
  confirmPassword,
  displayName,
}: UserRegisterCredentials) => {
  if (password !== confirmPassword)
    throw new CoreError('Password and Confirm Password inconsistent');

  const existingUser = await User.findOne({ email });

  if (existingUser) throw new CoreError('Email already in use');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword, displayName });
  try {
    await user.save();
    const data = { message: 'Register succeed' };

    return data;
  } catch {
    throw new CoreError('Register failed.');
  }
};

export const login = async ({ email, password }: UserLoginCredentials) => {
  const user = await User.findOne({ email });
  if (!user) throw new CoreError('User not found');

  if (!(await user.comparePassword(password)))
    throw new CoreError(`Wrong password`);

  const data = { token: generateToken(user) };

  return data;
};

export const googleOauth = async (user: UserTokenCredentials | undefined) => {
  const userToken: UserTokenCredentials = {
    _id: user?._id ?? '',
    displayName: user?.displayName ?? '',
    email: user?.email ?? '',
  };

  const data = { token: generateToken(userToken) };

  return data;
};
