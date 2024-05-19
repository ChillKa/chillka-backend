import { Request, Response, Router } from 'express';
import passport from 'passport';
import { zodValidateMiddleware } from '../middleware/validate.middleware';
import * as AuthService from '../service/auth.service';
import { throwAPIError } from '../util/error-handler';
import { loginSchema, registerSchema } from '../util/zod/auth.schema';

const authRouter = () => {
  const router = Router();

  router.post(
    '/register',
    zodValidateMiddleware(registerSchema),
    async (req: Request, res: Response) => {
      // #swagger.tags = ['Auth']
      // #swagger.parameters['body'] = { in: 'body', schema: { $ref: "#/schemas/UserRegisterCredentials" }}

      try {
        const data = await AuthService.register(req.body);
        res.status(201).send(data);
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

  router.get(
    '/google-oauth',
    passport.authenticate('google', {
      scope: ['email', 'profile'],
    })
  );

  router.get(
    '/google-oauth/callback',
    passport.authenticate('google', { session: false }),
    async (req: Request, res: Response) => {
      const data = await AuthService.googleOauth(req.user);

      const expires = new Date(Date.now() + 3600 * 1000); // 1 hour from now
      const options = {
        httpOnly: true,
        expires,
        path: '/',
      };

      res
        .cookie('session', data.token, options)
        .redirect(process.env.FRONTEND ?? '');
    }
  );

  return router;
};
const authRoute = authRouter();
export default authRoute;
