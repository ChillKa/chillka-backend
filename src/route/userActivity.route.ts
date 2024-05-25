import { Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import authorizeMiddleware from '../middleware/authorize.middleware';
import * as UserActivityService from '../service/userActivity.service';
import { SortEnum } from '../type/model.type';
import { throwAPIError } from '../util/error-handler';

const userActivityRouter = () => {
  const router = Router();

  router.post(
    '/activities',
    // FIXME: add request body
    authorizeMiddleware,
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Activity'] */

      const userId = req.user?._id;
      try {
        const data = await UserActivityService.createActivity(userId);
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
        const activities = await UserActivityService.getActivityList({
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

  router.post(
    '/activities/:activityId/attend',
    authorizeMiddleware,
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Activity'] 
          #swagger.parameters['body'] = {
            in: 'body',
            type: 'object',
            schema: { $ref: "#/schemas/AttendActivityParams.requestBody" },
          }
      */

      const userId = req.user?._id;
      const activityId = req.params?.activityId;

      try {
        if (!userId || !activityId) {
          return throwAPIError({
            res,
            error: 'Invalid user or activity id',
            statusCode: 400,
          });
        }

        const data = await UserActivityService.attendActivity({
          userId,
          activityId: new mongoose.Types.ObjectId(activityId),
          requestBody: req.body,
        });
        res.status(200).send(data);
      } catch (error) {
        console.log('error', error);
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  return router;
};
const userActivityRoute = userActivityRouter();

export default userActivityRoute;
