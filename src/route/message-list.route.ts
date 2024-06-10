import { Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import authorizeMiddleware from '../middleware/authorize.middleware';
import { zodValidateMiddleware } from '../middleware/validate.middleware';
import * as MessageListService from '../service/message-list.service';
import { throwAPIError } from '../util/error-handler';
import { messageListIdSchema } from '../util/zod/message-list.schema';

const messageRouter = () => {
  const router = Router();

  router.get(
    '/messageListId',
    authorizeMiddleware,
    zodValidateMiddleware(messageListIdSchema),
    async (req: Request, res: Response) => {
      const { orderId, hostUserId, participantUserId } = req.body;
      try {
        const data = await MessageListService.getMessageListId({
          orderId: new mongoose.Types.ObjectId(orderId),
          hostUserId: new mongoose.Types.ObjectId(hostUserId),
          participantUserId: new mongoose.Types.ObjectId(participantUserId),
        });

        res.status(200).send(data);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  return router;
};
const messageRoute = messageRouter();
export default messageRoute;
