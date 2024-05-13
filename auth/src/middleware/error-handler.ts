import express, { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom-error';

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    return response
      .status(error.statusCode)
      .send({ error: error.serializeError() });
  }

  response.status(404).send({ error: [{ message: 'something went wrong' }] });
};

export { errorHandler };
