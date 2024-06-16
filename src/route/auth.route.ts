import { Request, Response, Router } from 'express';
import passport from 'passport';
import { zodValidateMiddleware } from '../middleware/validate.middleware';
import * as AuthService from '../service/auth.service';
import { throwAPIError } from '../util/error-handler';
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from '../util/zod/auth.schema';

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
    /* #swagger.ignore = true */

    passport.authenticate('google', {
      scope: ['email', 'profile'],
    })
  );

  router.get(
    '/google-oauth/callback',
    /* #swagger.ignore = true */

    passport.authenticate('google', {
      session: false,
      failureRedirect: process.env.FRONTEND?.concat(
        '/callback?error=access_denied'
      ),
    }),
    async (req: Request, res: Response) => {
      const data = await AuthService.googleOauth(req.user);

      // wait for frontend page completed
      res.redirect(
        process.env.FRONTEND?.concat(`/callback?accessToken=${data.token}`) ??
          ''
      );
    }
  );

  router.get('/verify-email', async (req: Request, res: Response) => {
    /* #swagger.tags = ['Auth'] */

    try {
      const token = req.query.validateCode as string;
      const data = await AuthService.verifyEmail(token);

      // frontend should show the toast message in the front page
      res.redirect(`${process.env.FRONTEND}?message=${data.message}`);
    } catch (error) {
      throwAPIError({ res, error, statusCode: 400 });
    }
  });

  router.post(
    '/verify-email',
    zodValidateMiddleware(emailSchema),
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Auth'] */

      try {
        const data = await AuthService.sendEmail({
          ...req.body,
          emailType: 'verifyEmail',
        });

        res.status(200).send({ message: data.message });
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  router.post(
    '/reset-password',
    zodValidateMiddleware(emailSchema),
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Auth'] */

      try {
        const data = await AuthService.sendEmail({
          ...req.body,
          emailType: 'resetPassword',
        });

        res.status(200).send({ message: data.message });
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  router.patch(
    '/reset-password',
    zodValidateMiddleware(resetPasswordSchema),
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['Auth'] */

      try {
        const data = await AuthService.resetPassword(req.body);

        res.status(200).send(data);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  return router;
};
const authRoute = authRouter();
export default authRoute;
