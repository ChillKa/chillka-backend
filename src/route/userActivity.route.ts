import { Request, Response, Router } from 'express';
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

      const userId = req.cookies.id;
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

      const userId = req.cookies.id;
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

  return router;
};
const userActivityRoute = userActivityRouter();

export default userActivityRoute;
