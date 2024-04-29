import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/user.model';
import { CoreError } from '../util/api';
import { validateEmail, validatePassword } from '../util/validator';

interface UserCredentials {
  email: string;
  password: string;
}

export const register = async ({ email, password }: UserCredentials) => {
  const existingUser = await User.findOne({ email });
  const invalidEmail = !validateEmail(email);
  const invalidPassword = !validatePassword(password);

  if (existingUser) {
    throw new CoreError('Email already in use');
  }
  if (invalidEmail) {
    throw new CoreError('Invalid email format');
  }
  if (invalidPassword) {
    throw new CoreError(
      'Password must be at least 8 characters with letters and numbers'
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ email, password: hashedPassword });
  await user.save();

  return user;
};

export const login = async ({ email, password }: UserCredentials) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
  return token;
};
