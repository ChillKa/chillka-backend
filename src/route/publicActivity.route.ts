import { Request, Response, Router } from 'express';
import * as PublicActivityService from '../service/publicActivity.service';
import { throwAPIError } from '../util/error-handler';

const publicActivityRouter = () => {
  const router = Router();

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

  return router;
};
const publicActivityRoute = publicActivityRouter();

export default publicActivityRoute;
