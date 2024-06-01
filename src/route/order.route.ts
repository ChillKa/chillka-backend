import { Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import authorizeMiddleware from '../middleware/authorize.middleware';
import { zodValidateMiddleware } from '../middleware/validate.middleware';
import * as OrderService from '../service/order.service';
import { SortEnum } from '../type/model.type';
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

      try {
        const data = await OrderService.createOrder({
          userId: new mongoose.Types.ObjectId(userId),
          requestBody: req.body,
        });

        res.status(200).send(data);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  router.get(
    '/orders',
    authorizeMiddleware,
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Order'] 
          #swagger.parameters['sort'] = {
            in: 'query',
            required: false,
            type: 'string',
            enum: ['asc', 'des'],
          }
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

      try {
        const data = await OrderService.getOrderList({
          userId: new mongoose.Types.ObjectId(userId),
          page: Number(req.query.page),
          limit: Number(req.query.limit),
          sort: req.query.sort === 'asc' ? SortEnum.ASC : SortEnum.DES,
        });

        res.status(200).send(data);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  router.put(
    '/orders/:orderId/cancel',
    authorizeMiddleware,
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Order'] 
          #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: "#/schemas/CreateOrderCredentials" },
          }
      */

      const userId = req.user?._id;

      try {
        const data = await OrderService.cancelOrder({
          userId: new mongoose.Types.ObjectId(userId),
          orderId: new mongoose.Types.ObjectId(req.params.orderId),
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
