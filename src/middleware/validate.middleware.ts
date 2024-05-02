import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodTypeAny } from 'zod';
import { CoreError, throwAPIError } from '../util/errorHandler';

export const validateMiddleware =
  <T extends ZodTypeAny>(schema: T) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      await schema.parseAsync(body);

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const problem = error.flatten();
        const fieldErrors = problem.fieldErrors;
        const fieldErrorsString = Object.entries(fieldErrors)
          .map(([key, value]) => `${key}: ${value?.join(', ')}`)
          .join('\n');
        const coreError = new CoreError(fieldErrorsString);

        throwAPIError({ res, error: coreError, statusCode: 400 });
      } else {
        throwAPIError({ res, error, statusCode: 500 });
      }
    }
  };
