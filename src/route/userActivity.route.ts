import { Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import authorizeMiddleware from '../middleware/authorize.middleware';
import { zodValidateMiddleware } from '../middleware/validate.middleware';
import * as UserActivityService from '../service/userActivity.service';
import { SortEnum } from '../type/model.type';
import { CoreError, throwAPIError } from '../util/error-handler';
import { activitySchema } from '../util/zod/activity.schema';

const userActivityRouter = () => {
  const router = Router();

  router.post(
    '/activities',
    authorizeMiddleware,
    zodValidateMiddleware(activitySchema),
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Activity'] */

      const creatorId = req.user?._id;
      if (!creatorId)
        throw new CoreError('Unable to create activity without user id.');

      try {
        const data = await UserActivityService.create({
          creatorId,
          ...req.body,
        });
        res.status(200).send(data);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  router.get(
    '/activities',
    authorizeMiddleware,
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Activity'] 
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
        const activities = await UserActivityService.get({
          userId,
          page: Number(req.query.page),
          limit: Number(req.query.limit),
          sort: req.query.sort === 'asc' ? SortEnum.ASC : SortEnum.DES,
        });
        res.status(200).send(activities);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  router.patch(
    '/activities/:activityId/cancel',
    authorizeMiddleware,
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Activity'] */

      const userId = req.user?._id;
      const activityId = new mongoose.Types.ObjectId(req.params.activityId);
      try {
        const data = await UserActivityService.cancelActivity({
          activityId,
          userId,
        });

        res.status(200).send(data);
      } catch (error) {
        if (error instanceof CoreError) {
          if (error.options.cause === 403) {
            return throwAPIError({ res, error, statusCode: 403 });
          }
        }
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  return router;
};
const userActivityRoute = userActivityRouter();

export default userActivityRoute;
