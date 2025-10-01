import express, { Request, Response } from 'express';

const currentUserRouter = express.Router();

// Get current user information
currentUserRouter.get('/api/users/currentuser', async (req: Request, res: Response) => {
  try {
    // Example: replace with your actual user-fetching logic
    const currentUser = req.user || null; 

    res.status(200).json({
      success: true,
      data: currentUser,
    });
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export { currentUserRouter };
