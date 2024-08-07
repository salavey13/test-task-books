import express from 'express';
import bookRoutes from './routes/bookRoutes';
import userRoutes from './routes/userRoutes';
import prisma from './prismaClient';
import redis from './services/redisService';

const app = express();
app.use(express.json());

app.use('/api', bookRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  prisma.$connect();
  redis.connect();
});
