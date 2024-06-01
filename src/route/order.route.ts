import { Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import authorizeMiddleware from '../middleware/authorize.middleware';
import { zodValidateMiddleware } from '../middleware/validate.middleware';
import * as OrderService from '../service/order.service';
import { throwAPIError } from '../util/error-handler';
import { createOrderSchema } from '../util/zod/order.schema';

const orderRouter = () => {
  const router = Router();

  router.post(
    '/orders/:activityId',
    authorizeMiddleware,
    zodValidateMiddleware(createOrderSchema),
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Order'] 
          #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: "#/schemas/CreateOrderCredentials" },
          }
      */

      const userId = req.user?._id;
      const activityId = req.params?.activityId;

      try {
        const data = await OrderService.createOrder({
          userId: new mongoose.Types.ObjectId(userId),
          activityId: new mongoose.Types.ObjectId(activityId),
          requestBody: req.body,
        });

        res.status(200).send(data);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  return router;
};
const orderRoute = orderRouter();

export default orderRoute;
