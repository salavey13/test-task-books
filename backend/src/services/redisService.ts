import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export const cacheSet = async (key: string, value: any, expireSeconds?: number) => {
  await redis.set(key, JSON.stringify(value));
  if (expireSeconds) {
    await redis.expire(key, expireSeconds);
  }
};

export const cacheGet = async (key: string) => {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};

export const cacheDel = async (key: string) => {
  await redis.del(key);
};

export default redis;
