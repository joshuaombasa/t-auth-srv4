import express, { Request, Response } from 'express';

const signoutRouter = express.Router();

signoutRouter.post(
  '/api/users/signout',
  async (request: Request, response: Response) => {
    request.session = null

    response.send({})
  }
);

export { signoutRouter };
