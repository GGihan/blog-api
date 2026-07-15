import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcryptjs';
import postRouter from './routes/postRouter.js';

const app = express();

// Middleware for form and JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
// app.use('/api/auth', );
app.use('/api/posts', postRouter);
// app.use('/api/comments', );

// All none existing paths here
app.get('*path', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl} - Route not found.`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: 'An unexpected error occurred on the server.'
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server is running at http://localhost:${PORT}/`);
});