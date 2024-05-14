import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middleware/validate-request';
import { User, store } from '../models/user';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const signinRouter = express.Router();

signinRouter.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password must be provided')
  ],
  validateRequest,
  async (request: Request, response: Response) => {

    const { email, password } = request.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const isPasswordsMatch = await Password.compare(
      password,
      existingUser.password
    );

    if (!isPasswordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    const jwtToken = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser.id,
      },
      'asdf'
    );

    request.session = { jwt: jwtToken };

    response.status(201).send(existingUser);
  }
);

export { signinRouter };
