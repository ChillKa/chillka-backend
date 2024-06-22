import { Request, Response, Router } from 'express';
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
      /* #swagger.tags = ['MessageList'] 
          #swagger.parameters['body'] = { in: 'body', schema: { $ref: "#/schemas/GetMessageListParams" }}
      */

      const { orderId, hostUserId, participantUserId } = req.body;
      try {
        const data = await MessageListService.getMessageListId({
          orderId,
          hostUserId,
          participantUserId,
        });

        res.status(200).send(data);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  router.get(
    '/messages',
    authorizeMiddleware,
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['MessageList'] 
          #swagger.parameters['page'] = {
            in: 'query',
            required: false,
            type: 'number',
          }
          #swagger.parameters['limit'] = {
            in: 'query',
            required: false,
            type: 'number',
          }
      */

      const userId = req.user?._id;
      const page = Number(req.query.page);
      const limit = Number(req.query.limit);

      try {
        const data = await MessageListService.getMessageList({
          userId,
          page,
          limit,
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
