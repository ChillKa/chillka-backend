import { Response } from 'express';

interface APIError<TError = unknown> {
  res: Response;
  error: TError;
  statusCode: number;
}

/**
 * CoreError constructor
 *
 * @param message - error message
 * @param cause - error cause
 */
export class CoreError extends Error {
  public options: { cause: unknown };

  constructor(message: string, cause: unknown = 'core error') {
    super(message);
    this.name = 'CoreError';
    this.options = { cause };
  }
}

export const throwAPIError = ({ res, error, statusCode }: APIError) => {
  if (error instanceof CoreError) {
    return res.status(statusCode).send(error.message);
  }

  return res.status(500).send('Internal server error');
};
