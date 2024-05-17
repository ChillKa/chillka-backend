import { z } from 'zod';
import { GenderEnum } from '../../type/user.type';
import { validateInt } from '../validator';

export const editUserSchema = z.object({
  displayName: z
    .string()
    .min(2, 'Minimum two characters')
    .max(50, 'Maximum fifty characters')
    .optional(),
  email: z.string().email('Not a valid email').optional(),
  realName: z.string().min(2, 'Minimum two characters').optional(),
  gender: z.nativeEnum(GenderEnum).optional(),
  birthday: z.string().date('Invalid date format').optional(),
  phoneAreaCode: z
    .string()
    .refine((value) => validateInt(value), 'Not a number')
    .refine((value) => value.length === 3, 'Area code should be 3 digits')
    .optional(),
  phoneNumber: z
    .string()
    .min(7, 'Minimum in 7 digits')
    .max(15, 'Maximum in 15 digits')
    .refine((value) => validateInt(value), 'Not a number')
    .optional(),
});
