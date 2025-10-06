import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NotAuthorizedError } from '../errors/not-authorized-error';

interface UserPayload extends JwtPayload {
  email: string;
  id: string;
}

// Extend Express Request interface globally
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

/**
 * Middleware to identify the current user based on JWT stored in the session.
 * Adds `request.currentUser` if the token is valid.
 */
const currentUser = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const token = request.session?.jwt;

  if (!token) {
    // If there's no token, just proceed (optional: you could throw here instead)
    return next();
  }

  try {
    const secret = process.env.JWT_KEY;
    if (!secret) {
      throw new Error('JWT_KEY environment variable is not defined');
    }

    const payload = jwt.verify(token, secret) as UserPayload;
    request.currentUser = payload;
  } catch (error) {
    // Log or handle invalid token errors silently if desired
    console.warn('Invalid or expired JWT:', (error as Error).message);
  }

  next();
};

export { currentUser };
