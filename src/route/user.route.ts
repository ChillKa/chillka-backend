import { Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import authorizeMiddleware from '../middleware/authorize.middleware';
import { zodValidateMiddleware } from '../middleware/validate.middleware';
import * as UserService from '../service/user.service';
import { throwAPIError } from '../util/error-handler';
import { passwordSchema } from '../util/zod/auth.schema';
import { editUserSchema } from '../util/zod/user.schema';

const userRouter = () => {
  const router = Router();

  router.get(
    '/user/:userId',
    authorizeMiddleware,
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['User'] */

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
      /* #swagger.tags = ['User']
          #swagger.parameters['body'] = { 
            in: 'body', 
            schema: { $ref: "#/schemas/UserEditCredentials" },
        }
      */

      try {
        const userData = await UserService.edit(req.params.userId, req.body);

        res.status(200).send(userData);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  router.put(
    '/change-password',
    authorizeMiddleware,
    zodValidateMiddleware(passwordSchema),
    async (req: Request, res: Response) => {
      try {
        const data = await UserService.changePassword({
          userId: new mongoose.Types.ObjectId(req.user?._id ?? ''),
          password: req.body.password,
          confirmPassword: req.body.confirmPassword,
        });

        res.status(200).send(data);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  return router;
};
const userRoute = userRouter();

export default userRoute;
