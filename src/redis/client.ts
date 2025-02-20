import { Redis } from 'ioredis'
import { env } from '../env'

// Conectando no redis
export const redis = new Redis(env.REDIS_URL)
