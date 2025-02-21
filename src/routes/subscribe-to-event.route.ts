import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'

// Cadastrar inscri��es
export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        // Descri��o do que faz a rota
        summary: 'Subscribe someone to the event.',
        tags: ['subscription'],
        // Texto maior para descri��o
        description: '',
        // Validando os dados com o Zod
        body: z.object({
          name: z.string(), // Colocando .optional() ele vai entender que n�o � obrigat�rio
          email: z.string().email(),
          referrer: z.string().nullish(),
        }),
        // Setando o que vai ser mostrado na resposta do status 201
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      //request: Conte�do da requisi��o
      const { name, email, referrer } = request.body

      // Inserindo dados no bd
      const { subscriberId } = await subscribeToEvent({
        name,
        email,
        referrerId: referrer,
      })

      // reply: Resposta
      return reply.status(201).send({
        subscriberId,
      })
    }
  )
}
