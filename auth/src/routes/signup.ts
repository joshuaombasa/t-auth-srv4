import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middleware/validate-request';
import { User, store } from '../models/user';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const signupRouter = express.Router();

signupRouter.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (request: Request, response: Response) => {
    const { email, password } = request.body;

    await User.deleteMany({})

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('User with email already exists');
    }

    const hashedPassword = await Password.toHash(password);

    const userObject = store({ email, password: hashedPassword });
    const savedUser = await userObject.save();

    const jwtToken = jwt.sign(
      {
        email: savedUser.email,
        id: savedUser.id,
      },
      'asdf'
    );

    request.session = { jwt: jwtToken };

    response.status(201).send(savedUser);
  }
);

export { signupRouter };
