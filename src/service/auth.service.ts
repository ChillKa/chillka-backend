import emailjs from '@emailjs/nodejs';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import User from '../model/user.model';
import {
  ResetPasswordCrendtials,
  SendEmailCrendtials,
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
    throw new CoreError('Wrong password');

  const data = { token: generateToken(user) };

  return data;
};

// declare user undefined because the passport request is possible be undefined
export const googleOauth = async (user: UserTokenCredentials | undefined) => {
  if (!user) throw new CoreError('User not found');

  const userToken: UserTokenCredentials = {
    _id: user._id,
    displayName: user.displayName,
    email: user.email,
  };
  const data = { token: generateToken(userToken) };

  return data;
};

export const sendEmail = async ({ email, emailType }: SendEmailCrendtials) => {
  let message = 'email not found';

  const user = await User.findOne({ email });
  if (user) {
    const token = generateToken(user);

    // in production redirectUrl will redirect reset-password page
    const templateParams = {
      receiverName: user.displayName,
      redirectUrl: `${process.env.HOST}/api/demo/reset-password?validateCode=${token}`,
      receiverMail: email,
    };

    emailjs.init({
      publicKey: process.env.EMAILJS_PUBLICKEY!,
      privateKey: process.env.EMAILJS_PRIVATEKEY!,
    });

    const emailjsTemplate =
      emailType === 'resetPassword'
        ? process.env.RESET_PASSWORD_TEMPLATE!
        : process.env.VERIFY_EMAIL_TEMPLATE!;

    await emailjs.send(
      process.env.EMAILJS_SERVICEID!,
      emailjsTemplate,
      templateParams
    );

    message = '重置密碼連結已寄到您的 email 信箱';
  }

  return { message };
};

export const resetPassword = async ({
  token,
  password,
  confirmPassword,
}: ResetPasswordCrendtials) => {
  if (password !== confirmPassword)
    throw new CoreError('Password and Confirm Password inconsistent');

  try {
    const _decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as UserTokenCredentials;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { email: _decoded.email },
      { $set: { password: hashedPassword } }
    );
  } catch {
    throw new CoreError('ResetPassword failed.');
  }

  return { message: '密碼重置成功' };
};
