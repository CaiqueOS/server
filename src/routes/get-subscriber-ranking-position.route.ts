import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberRankingPosition } from '../functions/get-subscriber-ranking-position'

// Cadastrar inscri��es
export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/position',
      {
        schema: {
          // Descri��o do que faz a rota
          summary: 'Get subscriber ranking position',
          tags: ['referral'],
          // Texto maior para descri��o
          description: '',
          // Validando os dados com o Zod
          params: z.object({
            subscriberId: z.string(), // Colocando .optional() ele vai entender que n�o � obrigat�rio
          }),
          // Setando o que vai ser mostrado na resposta do status 201
          response: {
            200: z.object({
              position: z.number().nullable(),
            }),
          },
        },
      },
      async request => {
        //request: Conte�do da requisi��o
        const { subscriberId } = request.params

        const { position } = await getSubscriberRankingPosition({
          subscriberId,
        })

        return { position }
      }
    )
  }
