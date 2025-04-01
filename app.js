import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import questionRoutes from './routes/questionRoutes.js';
import dotenv from 'dotenv';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api', teamRoutes);

// Error handling
app.use(errorHandler);

export default app;