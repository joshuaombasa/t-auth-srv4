import express, { Request, Response } from 'express';

const signoutRouter = express.Router();

/**
 * @route   POST /api/users/signout
 * @desc    Logs the user out by clearing their session
 * @access  Public
 */
signoutRouter.post('/api/users/signout', async (req: Request, res: Response) => {
  try {
    // Clear the session cookie
    req.session = null;

    return res.status(200).send({ message: 'Successfully signed out' });
  } catch (error) {
    console.error('Error signing out:', error);
    return res.status(500).send({ error: 'Failed to sign out' });
  }
});

export { signoutRouter };
