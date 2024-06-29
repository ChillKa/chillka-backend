import { Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import * as PublicActivityService from '../service/publicActivity.service';
import { GetSearchActivitiesCredential } from '../type/activity.type';
import { throwAPIError } from '../util/error-handler';

const publicActivityRouter = () => {
  const router = Router();

  router.get('/activities', async (req: Request, res: Response) => {
    /* #swagger.tags = ['Activity'] */

    const reqQuery = req.query as GetSearchActivitiesCredential;
    try {
      const data = await PublicActivityService.getSearchActivities(reqQuery);
      res.status(200).send(data);
    } catch (error) {
      throwAPIError({ res, error, statusCode: 400 });
    }
  });

  router.get('/activities/recommend', async (req: Request, res: Response) => {
    /* #swagger.tags = ['Activity'] */

    const keyword = req.query.keyword as string;
    const userId = req.query.userId as string;
    const queryLimit = req.query.limit;
    const limit =
      queryLimit && Number.isInteger(+queryLimit) && +queryLimit > 0
        ? +queryLimit
        : 3;
    try {
      const data = await PublicActivityService.getRecommendActivities({
        keyword,
        userId,
        limit,
      });

      res.status(200).send(data);
    } catch (error) {
      throwAPIError({ res, error, statusCode: 400 });
    }
  });

  router.get(
    '/activities/popular-keywords',
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Activity'] */

      try {
        const data = await PublicActivityService.getPopularKeywords();
        res.status(200).send(data);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  router.get('/activities/comments', async (req: Request, res: Response) => {
    /* #swagger.tags = ['Activity'] */

    try {
      const data = await PublicActivityService.getComments();
      res.status(200).send(data);
    } catch (error) {
      throwAPIError({ res, error, statusCode: 400 });
    }
  });

  router.get('/activities/:activityId', async (req: Request, res: Response) => {
    /* #swagger.tags = ['Activity'] */
    const activityId = req.params.activityId;
    const userId = req.query.userId as string;

    try {
      const activities = await PublicActivityService.getActivityDetail({
        activityId: new mongoose.Types.ObjectId(activityId),
        userId,
      });
      res.status(200).send(activities);
    } catch (error) {
      throwAPIError({ res, error, statusCode: 400 });
    }
  });

  return router;
};
const publicActivityRoute = publicActivityRouter();

export default publicActivityRoute;
