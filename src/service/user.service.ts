import { isValidObjectId } from 'mongoose';
import User from '../model/user.model';
import { UserEditCredentials } from '../type/user.type';
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
