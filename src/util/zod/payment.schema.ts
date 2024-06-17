import { z } from 'zod';
import { PaymentStatusEnum, PaymentTypeEnum } from '../../type/order.type';
import { validateInt } from '../validator';

export const paymentCheckoutSchema = z.object({
  activityId: z.string({ required_error: 'Activity id is required' }),
  ticketId: z.string({ required_error: 'Ticket id is required' }),
  orderContact: z.object({
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
    amount: z
      .string({ required_error: 'Amount is required' })
      .refine((value) => validateInt(value), 'Not a number'),
    status: z.nativeEnum(PaymentStatusEnum).optional(),
    type: z.nativeEnum(PaymentTypeEnum).optional(),
    orderNumber: z.number({ required_error: 'Order number is required' }),
  }),
  tradeDesc: z.string({ required_error: 'Trade Description is required' }),
  itemName: z.string({ required_error: 'Item Name is required' }),
});
