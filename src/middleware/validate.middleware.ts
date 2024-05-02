import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodTypeAny } from 'zod';

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
        return res.status(400).json({ error: fieldErrors });
      } else {
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
  };
