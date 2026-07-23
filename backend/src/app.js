import 'dotenv/config';
import express from 'express';
import { corsOptionsMiddleware } from './middleware/cors.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';
import commentRouter from './routes/commentRouter.js';

const app = express();

// CORS middleware
app.use(corsOptionsMiddleware);
// Middleware for form and JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

// All none existing paths here
app.get('*path', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl} - Route not found.`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  // Development only
  console.error('Server Error:', err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected error occurred on the server.';
  res.status(statusCode).json({
    success: false,
    message: message,
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server is running at http://localhost:${PORT}/`);
});