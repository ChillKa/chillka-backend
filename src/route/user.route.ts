import { Request, Response, Router } from 'express';
import authorizeMiddleware from '../middleware/authorize.middleware';
import { zodValidateMiddleware } from '../middleware/validate.middleware';
import * as UserService from '../service/user.service';
import { throwAPIError } from '../util/error-handler';
import { editUserSchema } from '../util/zod/user.schema';

const userRoute = () => {
  const router = Router();

  router.get(
    '/user/:userId',
    authorizeMiddleware,
    async (req: Request, res: Response) => {
      try {
        const userData = await UserService.get(req.params.userId);
        res.status(200).send(userData);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  router.patch(
    '/user/:userId',
    authorizeMiddleware,
    zodValidateMiddleware(editUserSchema),
    async (req: Request, res: Response) => {
      try {
        const userData = await UserService.edit(req.params.userId, req.body);

        res.status(200).send(userData);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  return router;
};

export default userRoute;
