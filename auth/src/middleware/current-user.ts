import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from '../errors/not-authorized-error';

interface UserPayload {
  email: string;
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser: UserPayload;
    }
  }
}

const currentUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.session?.jwt) {
    throw new NotAuthorizedError();
  }

  const jwtToken = request.session?.jwt;

  try {
    const decodedUserInfo = jwt.verify(jwtToken, 'asdf') as UserPayload;
    request.currentUser = decodedUserInfo;
  } catch (error) {}

  next();
};

export { currentUser };
