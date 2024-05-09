import User from '../model/user.model';
import { UserSchemaModel } from '../type/user.type';
import { CoreError } from '../util/error-handler';

export const get = async (userId: string) => {
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    throw new CoreError('User not found');
  }
  const { password: _password, ...userData } = existingUser.toObject();

  return userData;
};

interface UserEditCredentials extends Omit<UserSchemaModel, 'password'> {}

export const edit = async (
  userId: string,
  requestBody: UserEditCredentials
) => {
  const existingUser = await User.findById(userId);
  if (!existingUser) throw new CoreError('User not found');

  try {
    existingUser.set(requestBody);
    await existingUser.save();

    const { password: _password, ...userData } = existingUser.toObject();

    return userData;
  } catch {
    throw new CoreError('Edit failed');
  }
};
