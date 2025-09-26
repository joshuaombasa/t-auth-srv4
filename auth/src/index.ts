import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found';

const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb://127.0.0.1:27017/tiketi6-auth?directConnection=true';

const app = express();

// Middleware
app.set('trust proxy', true); // fix typo: "truest proxy"
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === 'production', // secure only in production
  })
);

// Routes
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

// Catch-all for unhandled routes
app.all('*', async () => {
  throw new NotFoundError();
});

// Error handler
app.use(errorHandler);

// Server start
const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
  }
};

start();
