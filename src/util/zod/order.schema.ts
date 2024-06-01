import { z } from 'zod';
// import { PaymentMethodEnum, PaymentStatusEnum } from '../../type/ticket.type';
import { validateInt } from '../validator';

export const createOrderSchema = z.object({
  userInfo: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Not a valid email'),
    phone: z
      .string({ required_error: 'Phone is required' })
      .min(7, 'Minimum in 7 digits')
      .max(15, 'Maximum in 15 digits')
      .refine((value) => validateInt(value), 'Not a number'),
  }),
  payment: z.object({
    amount: z.number({ required_error: 'Amount is required' }),
    // status: z.nativeEnum(PaymentStatusEnum),
    // method: z.nativeEnum(PaymentMethodEnum),
    orderNumber: z.number({ required_error: 'Order number is required' }),
  }),
});
