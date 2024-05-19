import { Request, Response, Router } from 'express';
import authorizeMiddleware from '../middleware/authorize.middleware';
import * as UserActivityService from '../service/userActivity.service';
import { throwAPIError } from '../util/error-handler';

const userActivityRouter = () => {
  const router = Router();

  router.post(
    '/activities',
    // FIXME: add request body
    authorizeMiddleware,
    async (req: Request, res: Response) => {
      // #swagger.tags = ['Activity']
      const userId = req.body.user.id;

      try {
        const data = await UserActivityService.create(userId);
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
      // #swagger.tags = ['Activity']
      const userId = req.body.user.id;

      try {
        const activities = await UserActivityService.get({ userId });
        res.status(200).send(activities);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  return router;
};
const userActivityRoute = userActivityRouter();

export default userActivityRoute;
