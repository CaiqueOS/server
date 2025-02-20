import { z } from 'zod'

// Validando vari�veis de ambiente, para garantir que n�o sejam undefined

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  WEB_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
