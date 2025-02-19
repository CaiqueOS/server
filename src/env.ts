import { z } from 'zod'

// Validando variáveis de ambiente, para garantir que não sejam undefined

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
})

export const env = envSchema.parse(process.env)
