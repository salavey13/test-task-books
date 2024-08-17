import 'dotenv/config';
import express from 'express';
import bookRoutes from './routes/bookRoutes';
import userRoutes from './routes/userRoutes';
import prisma from './prismaClient';
import { cacheSet } from './services/redisService';

const app = express();
app.use(express.json());

app.use('/api', bookRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;

// Function to connect to services
const startServer = async () => {
  // Connect to Prisma
  try {
    await prisma.$connect();
    console.log('Connected to Prisma');
  } catch (error) {
    console.error('Error connecting to Prisma:', error);
  }

  // Check if Redis should be connected
  if (process.env.REDIS_URL) {
    try {
      // Test Redis connection
      await cacheSet('test_key', 'test_value');
      console.log('Connected to Redis');
    } catch (error) {
      console.error('Error connecting to Redis:', error);
    }
  } else {
    console.warn('Redis is not initialized because REDIS_URL is not set');
  }

  // Start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Start the server
startServer();
