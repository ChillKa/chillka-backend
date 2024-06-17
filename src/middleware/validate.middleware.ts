import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodTypeAny } from 'zod';
import { CoreError, throwAPIError } from '../util/error-handler';
import { zodErrorHandler } from '../util/zod/zodError-hanlder';

export const zodValidateMiddleware =
  <T extends ZodTypeAny>(schema: T) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      await schema.parseAsync(body);

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const zodError = zodErrorHandler(error);
        const coreError = new CoreError(zodError);

        throwAPIError({ res, error: coreError, statusCode: 400 });
      } else {
        throwAPIError({ res, error, statusCode: 500 });
      }
    }
  };
