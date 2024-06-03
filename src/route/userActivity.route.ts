import { Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import authorizeMiddleware from '../middleware/authorize.middleware';
import { zodValidateMiddleware } from '../middleware/validate.middleware';
import * as UserActivityService from '../service/userActivity.service';
import { SortEnum } from '../type/model.type';
import { CoreError, throwAPIError } from '../util/error-handler';
// import { userAttendSchema } from "../util/zod/userActivity.schema";
import {
  activitySchema,
  questionSchema,
} from '../util/zod/userActivity.schema';

const userActivityRouter = () => {
  const router = Router();

  router.post(
    '/activities',
    authorizeMiddleware,
    zodValidateMiddleware(activitySchema),
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Activity'] */

      const creatorId = req.user?._id;
      try {
        const data = await UserActivityService.createActivity({
          creatorId,
          ...req.body,
        });
        res.status(200).send(data);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  router.put(
    '/activities/:activityId',
    authorizeMiddleware,
    zodValidateMiddleware(activitySchema),
    async (req: Request, res: Response) => {
      const userId = req.user?._id;
      try {
        const activityId = new mongoose.Types.ObjectId(req.params.activityId);
        const data = await UserActivityService.editActivity({
          userId,
          activityId,
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

  router.get(
    '/activities/:activityId',
    authorizeMiddleware,
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Activity'] */
      const activityId = req.params.activityId;

      try {
        const activities = await UserActivityService.getActivityDetail({
          activityId: new mongoose.Types.ObjectId(activityId),
        });
        res.status(200).send(activities);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  router.put(
    '/activities/:activityId/cancel',
    authorizeMiddleware,
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Activity'] */

      const userId = req.user?._id;
      try {
        const activityId = new mongoose.Types.ObjectId(req.params.activityId);
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

  router.get(
    '/activities/:activityId/participants',
    authorizeMiddleware,
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Activity']
          #swagger.parameters['participantName'] = {
          in: 'query',
          required: false,
          type: 'string',
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

      const activityId = req.params?.activityId;

      try {
        const data = await UserActivityService.getParticipantList({
          activityId: new mongoose.Types.ObjectId(activityId),
          participantName: req.query.participantName?.toString(),
          page: Number(req.query.page),
          limit: Number(req.query.limit),
        });

        res.status(200).send(data);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  router.post(
    '/activities/:activityId/q-and-a',
    authorizeMiddleware,
    zodValidateMiddleware(questionSchema),
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Activity'] */
      try {
        const userId = req.user?._id;
        if (!userId)
          throw new CoreError('Unable to ask question without user id.');
        const activityId = new mongoose.Types.ObjectId(req.params?.activityId);
        if (!activityId)
          throw new CoreError('Unable to ask question without activity id.');
        const data = await UserActivityService.createQuestion({
          userId,
          activityId,
          ...req.body,
        });
        res.status(200).send(data);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  router.patch(
    '/activities/:activityId/q-and-a',
    authorizeMiddleware,
    zodValidateMiddleware(questionSchema),
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Activity'] */
      try {
        const userId = req.user?._id;
        if (!userId)
          throw new CoreError('Unable to edit question without user id.');
        const activityId = new mongoose.Types.ObjectId(req.params?.activityId);
        if (!activityId)
          throw new CoreError('Unable to edit question without activity id.');
        const data = await UserActivityService.editQuestion({
          userId,
          activityId,
          ...req.body,
        });
        res.status(200).send(data);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  router.delete(
    '/activities/:activityId/q-and-a',
    authorizeMiddleware,
    zodValidateMiddleware(questionSchema),
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Activity'] */
      try {
        const userId = req.user?._id;
        if (!userId)
          throw new CoreError('Unable to edit question without user id.');
        const activityId = new mongoose.Types.ObjectId(req.params?.activityId);
        if (!activityId)
          throw new CoreError('Unable to edit question without activity id.');
        const data = await UserActivityService.deleteQuestion({
          userId,
          activityId,
          ...req.body,
        });
        res.status(200).send(data);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  router.post(
    '/saved-activities/:activityId',
    authorizeMiddleware,
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Activity'] */

      const userId = req.user?._id;
      const activityId = req.params?.activityId;
      try {
        const data = await UserActivityService.collectActivity({
          activityId: new mongoose.Types.ObjectId(activityId),
          userId: new mongoose.Types.ObjectId(userId),
        });

        res.status(200).send(data);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  router.get(
    '/saved-activities',
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
        const data = await UserActivityService.getSavedActivityList({
          userId: new mongoose.Types.ObjectId(userId),
        });

        res.status(200).send(data);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  return router;
};
const userActivityRoute = userActivityRouter();

export default userActivityRoute;
