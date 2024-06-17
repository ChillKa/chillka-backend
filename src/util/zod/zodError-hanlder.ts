import { ZodError } from 'zod';

export const zodErrorHandler = (error: ZodError) => {
  const problem = error.flatten();
  const fieldErrors = problem.fieldErrors;
  const fieldErrorsString = Object.entries(fieldErrors)
    .map(([key, value]) => `${key}: ${value?.join(', ')}`)
    .join('\n');
  return fieldErrorsString;
};
