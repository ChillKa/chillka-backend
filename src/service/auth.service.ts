import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/user.model';

interface UserCredentials {
  email: string;
  password: string;
}

export const register = async ({ email, password }: UserCredentials) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already in use');
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
