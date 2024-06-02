import { z } from 'zod';

export const paymentCheckoutSchema = z.object({
  totalAmount: z.string({ required_error: 'Amount is required' }),
  tradeDesc: z.string({ required_error: 'Trade Description is required' }),
  itemName: z.string({ required_error: 'Item Name is required' }),
});
