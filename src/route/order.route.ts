import { Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import authorizeMiddleware from '../middleware/authorize.middleware';
import * as OrderService from '../service/order.service';
import { SortEnum } from '../type/model.type';
import { throwAPIError } from '../util/error-handler';

const orderRouter = () => {
  const router = Router();

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

  router.get(
    '/orders/:orderId',
    authorizeMiddleware,
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Order'] */

      try {
        const data = await OrderService.getOrderDetail(req.params.orderId);

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
      /* #swagger.tags = ['Order'] */

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

  router.put(
    '/orders/use-serial-number',
    authorizeMiddleware,
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Order'] */

      const userId = req.user?._id;
      try {
        const data = await OrderService.useSerialNumberOrder({
          userId: new mongoose.Types.ObjectId(userId),
          serialNumber: req.body.serialNumber,
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
