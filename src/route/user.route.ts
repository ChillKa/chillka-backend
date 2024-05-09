import { Request, Response, Router } from 'express';
import * as UserService from '../service/user.service';
import { throwAPIError } from '../util/error-handler';

const userRoute = () => {
  const router = Router();

  router.get('/user/:userId', async (req: Request, res: Response) => {
    try {
      const userData = await UserService.get(req.params.userId);
      res.status(200).send(userData);
    } catch (error) {
      throwAPIError({ res, error, statusCode: 400 });
    }
  });

  router.patch('/user/:userId', async (req: Request, res: Response) => {
    try {
      const displayName = await UserService.edit(req.params.userId, req.body);

      res.status(200).send(displayName);
    } catch (error) {
      throwAPIError({ res, error, statusCode: 400 });
    }
  });

  return router;
};

export default userRoute;
