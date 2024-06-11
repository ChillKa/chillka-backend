import { Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import authorizeMiddleware from '../middleware/authorize.middleware';
import { zodValidateMiddleware } from '../middleware/validate.middleware';
import * as UserService from '../service/user.service';
import { ImageFile } from '../type/activity.type';
import { CoreError, throwAPIError } from '../util/error-handler';
import uploadMultipleImages from '../util/multer-cloudinary';
import { changePasswordSchema } from '../util/zod/auth.schema';
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
    zodValidateMiddleware(changePasswordSchema),
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['User'] 
          #swagger.parameters['body'] = {
          in: 'body',
          schema: { $ref: "#/schemas/ChangePasswordCredentials" },
          }
      */

      try {
        const data = await UserService.changePassword({
          userId: new mongoose.Types.ObjectId(req.user?._id ?? ''),
          oldPassword: req.body.oldPassword,
          newPassword: req.body.newPassword,
          confirmNewPassword: req.body.confirmNewPassword,
        });

        res.status(200).send(data);
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  router.post(
    '/upload-images',
    authorizeMiddleware,
    async (req: Request, res: Response) => {
      /* #swagger.tags = ['User'] */

      try {
        uploadMultipleImages(req, res, function (err) {
          if (err)
            return throwAPIError({
              res,
              error: new CoreError(err.message),
              statusCode: 401,
            });

          if (!req.files) {
            return throwAPIError({
              res,
              error: new CoreError('Please upload images.'),
              statusCode: 400,
            });
          }

          const imageUrls = [];
          for (const file of req.files as ImageFile[]) {
            imageUrls.push(file.path);
          }
          const data = { imageUrls };

          res.status(200).send(data);
        });
      } catch (error) {
        throwAPIError({ res, error, statusCode: 400 });
      }
    }
  );

  return router;
};
const userRoute = userRouter();

export default userRoute;
