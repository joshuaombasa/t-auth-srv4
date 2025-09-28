import express, { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';


const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors: ValidationError[] = errors.array();
  throw new RequestValidationError(extractedErrors);
};

export { validateRequest };
