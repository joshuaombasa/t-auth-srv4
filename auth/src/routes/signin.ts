import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middleware/validate-request';
import { User } from '../models/user';
import { Password } from '../services/password';

const signinRouter = express.Router();

signinRouter.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    // Verify password
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    // Generate JWT securely
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY! // use environment variable, not hardcoded secret
    );

    // Store JWT in session object
    req.session = { jwt: userJwt };

    res.status(200).send(existingUser);
  }
);

export { signinRouter };
