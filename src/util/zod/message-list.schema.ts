import { z } from 'zod';

export const messageListIdSchema = z.object({
  orderId: z.string({ required_error: 'Activity id is required' }),
  hostUserId: z.string({ required_error: 'Activity id is required' }),
  participantUserId: z.string({ required_error: 'Activity id is required' }),
});
