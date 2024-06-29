import emailjs from '@emailjs/nodejs';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import User from '../model/user.model';
import { AuthDecoded } from '../type/model.type';
import {
  ResetPasswordCredentials,
  SendEmailCredentials,
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
  } catch (error) {
    throw new CoreError(
      error instanceof Error ? error.message : 'Register failed.'
    );
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

export const sendEmail = async ({ email, emailType }: SendEmailCredentials) => {
  let message = 'email not found';

  const user = await User.findOne({ email });
  if (user) {
    let emailjsTemplate = '';
    let redirectUrl = '';
    const token = generateToken(user);

    switch (emailType) {
      case 'resetPassword':
        emailjsTemplate = process.env.RESET_PASSWORD_TEMPLATE!;
        redirectUrl = `${process.env.FRONTEND}/auth/reset-password?validateCode=${token}`;
        // wait for frontend reset password page
        message = '重置密碼連結已寄到您的 email 信箱';
        break;
      case 'verifyEmail':
        emailjsTemplate = process.env.VERIFY_EMAIL_TEMPLATE!;
        redirectUrl = `${process.env.HOST}/api/verify-email?validateCode=${token}`;
        message = '驗證信箱連結已寄到您的 email 信箱';
        break;
      default:
        throw new CoreError('EmailType not found.');
    }

    const templateParams = {
      receiverName: user.displayName,
      redirectUrl,
      receiverMail: email,
    };

    emailjs.init({
      publicKey: process.env.EMAILJS_PUBLICKEY!,
      privateKey: process.env.EMAILJS_PRIVATEKEY!,
    });

    await emailjs.send(
      process.env.EMAILJS_SERVICEID!,
      emailjsTemplate,
      templateParams
    );
  }

  return { message };
};

export const verifyEmail = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthDecoded;

    await User.findOneAndUpdate(
      { email: decoded.email },
      { $set: { isEmailValidate: true } }
    );
  } catch (error) {
    throw new CoreError(
      error instanceof Error ? error.message : 'VerifyEmail failed.'
    );
  }

  return { message: '信箱驗證成功' };
};

export const resetPassword = async ({
  token,
  password,
  confirmPassword,
}: ResetPasswordCredentials) => {
  if (password !== confirmPassword)
    throw new CoreError('Password and Confirm Password inconsistent');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthDecoded;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { email: decoded.email },
      { $set: { password: hashedPassword } }
    );
  } catch (error) {
    throw new CoreError(
      error instanceof Error ? error.message : 'Reset password failed.'
    );
  }

  return { message: '密碼重置成功' };
};
