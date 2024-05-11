import { z } from 'zod';
import { Gender } from '../../type/user.type';
import { validatePassword } from '../validator';

export const registerSchema = z.object({
  displayName: z
    .string({ required_error: 'Display Name is required' })
    .min(2, 'Minimum two characters')
    .max(50, 'Maximum fifty characters'),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Not a valid email'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Minimum eight characters')
    .refine(
      (value) => validatePassword(value),
      'At least a letter and a number'
    ),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Not a valid email'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Minimum eight characters')
    .refine(
      (value) => validatePassword(value),
      'At least a letter and a number'
    ),
});

export const editUserSchema = z.object({
  displayName: z
    .string()
    .min(2, 'Minimum two characters')
    .max(50, 'Maximum fifty characters')
    .optional(),
  email: z.string().email('Not a valid email').optional(),
  realName: z.string().min(2, 'Minimum two characters').optional(),
  gender: z.nativeEnum(Gender).optional(),
  birthday: z.string().date('Invalid date format').optional(),
  phoneAreaCode: z
    .number()
    .refine(
      (value) => value.toString().length === 3,
      'Area code should be 3 digits'
    )
    .optional(),
  phoneNumber: z
    .number()
    .min(7, 'Minimum in 7 digits')
    .max(20, 'Maximum in 20 digits')
    .optional(),
});
