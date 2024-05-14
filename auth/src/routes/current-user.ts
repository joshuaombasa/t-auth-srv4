import express, { Request, Response } from 'express';

const currentuserRouter = express.Router();

currentuserRouter.get(
  '/api/users/currentuser',
  async (request: Request, response: Response) => {
    

    response.send({});
  }
);

export { currentuserRouter };
