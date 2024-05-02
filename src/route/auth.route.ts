import { Request, Response, Router } from 'express';
import { validateMiddleware } from '../middleware/validate.middleware';
import { loginSchema, registerSchema } from '../schema/auth.schema';
import * as AuthService from '../service/auth.service';
import { throwAPIError } from '../util/errorHandler';

const authRoute = () => {
  const router = Router();

  router.post(
    '/register',
    validateMiddleware(registerSchema),
    async (req: Request, res: Response) => {
      try {
        const user = await AuthService.register(req.body);
        res.status(201).send(user);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  router.post(
    '/login',
    validateMiddleware(loginSchema),
    async (req: Request, res: Response) => {
      try {
        const token = await AuthService.login(req.body);
        res.status(200).send({ token });
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  return router;
};

export default authRoute;
