import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL;

let redis: Redis | null = null;

if (redisUrl) {
  redis = new Redis(redisUrl);

  redis.on('error', (err) => {
    console.error('Redis error:', err);
  });

  redis.on('ready', () => {
    console.log('Redis connected');
  });
} else {
  console.log('Redis is not configured');
}

// Conditional export of Redis client and cache functions
export const cacheSet = async (key: string, value: any, expireSeconds?: number) => {
  if (redis) {
    await redis.set(key, JSON.stringify(value));
    if (expireSeconds) {
      await redis.expire(key, expireSeconds);
    }
  } else {
    console.warn('Redis client is not initialized. Cache set operation skipped.');
  }
};

export const cacheGet = async (key: string) => {
  if (redis) {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } else {
    console.warn('Redis client is not initialized. Cache get operation skipped.');
    return null;
  }
};

export const cacheDel = async (key: string) => {
  if (redis) {
    await redis.del(key);
  } else {
    console.warn('Redis client is not initialized. Cache delete operation skipped.');
  }
};

// Exporting redis client if needed
export default redis;
