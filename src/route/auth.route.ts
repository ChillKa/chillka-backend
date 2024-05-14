import { Request, Response, Router } from 'express';
import { zodValidateMiddleware } from '../middleware/validate.middleware';
import * as AuthService from '../service/auth.service';
import { throwAPIError } from '../util/error-handler';
import { loginSchema, registerSchema } from '../util/zod/auth.schema';

const authRoute = () => {
  const router = Router();

  router.post(
    '/register',
    zodValidateMiddleware(registerSchema),
    async (req: Request, res: Response) => {
      // #swagger.tags = ['Auth']
      // #swagger.parameters['body'] = { in: 'body', schema: { $ref: "#/schemas/UserRegisterCredentials" }}

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
    zodValidateMiddleware(loginSchema),
    async (req: Request, res: Response) => {
      // #swagger.tags = ['Auth']
      // #swagger.parameters['body'] = { in: 'body', schema: { $ref: "#/schemas/UserLoginCredentials" }}

      try {
        const data = await AuthService.login(req.body);

        res.status(200).send(data);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  return router;
};

export default authRoute;
