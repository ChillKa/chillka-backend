import bcrypt from 'bcryptjs';
import { isValidObjectId } from 'mongoose';
import User from '../model/user.model';

import { ChangePasswordParams, UserEditCredentials } from '../type/user.type';
import { CoreError } from '../util/error-handler';

export const get = async (userId: string) => {
  if (!isValidObjectId(userId)) {
    throw new CoreError('Invalid user ID');
  }

  const existingUser = await User.findById(userId).select('-password');
  if (!existingUser) {
    throw new CoreError('User not found');
  }

  return existingUser;
};

export const edit = async (
  userId: string,
  requestBody: UserEditCredentials
) => {
  if (!isValidObjectId(userId)) {
    throw new CoreError('Invalid user ID');
  }

  const existingUser = await User.findById(userId).select('-password');
  if (!existingUser) {
    throw new CoreError('User not found');
  }

  const validFields = Object.keys(requestBody).every(
    (field) => field in existingUser
  );
  if (!validFields) {
    throw new CoreError('Invalid field');
  }

  existingUser.set(requestBody);
  await existingUser.save();

  return existingUser;
};

export const changePassword = async ({
  userId,
  password,
  confirmPassword,
}: ChangePasswordParams) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new CoreError('User not found');
  }
  if (password !== confirmPassword) {
    throw new CoreError('Password and Confirm Password inconsistent');
  }

  const newHashedPassword = await bcrypt.hash(password, 10);
  const isSamePassword = await bcrypt.compare(password, user.password);

  if (isSamePassword) {
    throw new CoreError(
      "New password can't be the same as the current password"
    );
  }

  await user.updateOne({ $set: { password: newHashedPassword } });

  return { message: 'Password changed successfully' };
};
