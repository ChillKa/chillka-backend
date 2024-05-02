import { z } from 'zod';
import { validatePassword } from '../util/validator';

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
