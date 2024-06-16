import { z } from 'zod';
import { MessageUserType } from '../../type/message-list.type';

export const messageListIdSchema = z.object({
  orderId: z.string({ required_error: 'Activity id is required' }),
  hostUserId: z.string({ required_error: 'Activity id is required' }),
  participantUserId: z.string({ required_error: 'Activity id is required' }),
});

export const messageSchema = z.object({
  content: z.string({ required_error: 'Content is required' }),
  userType: z.nativeEnum(MessageUserType, {
    required_error: 'User type is required',
  }),
});
