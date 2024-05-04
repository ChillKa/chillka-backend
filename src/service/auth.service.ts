import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../model/user.model';
import { CoreError } from '../util/error-handler';

interface RegisterUserCredentials extends IUser {}

export const register = async ({
  email,
  password,
  displayName,
}: RegisterUserCredentials) => {
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
    throw new CoreError('Resgiter failed.');
  }
};

interface LoginUserCredentials extends Omit<IUser, 'displayName'> {}

export const login = async ({ email, password }: LoginUserCredentials) => {
  const user = await User.findOne({ email });
  if (!user) throw new CoreError('User not found');

  if (!(await user.comparePassword(password)))
    throw new CoreError(`Wrong password`);

  const token = jwt.sign(
    { id: user._id, username: user.displayName },
    process.env.JWT_SECRET!
  );
  return token;
};
