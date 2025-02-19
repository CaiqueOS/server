import { z } from 'zod'

// Validando vari�veis de ambiente, para garantir que n�o sejam undefined

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
})

export const env = envSchema.parse(process.env)
